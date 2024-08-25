import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera,CameraType } from 'expo-camera/legacy';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';


export default function RecordingScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [isAudioRecording, setIsAudioRecording] = useState(false); 
  const [responseText, setResponseText] = useState('');
  const [videoUri, setVideoUri] = useState(null);
  const [audioRecording, setAudioRecording] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();


  const enableAudio = async () => {
    await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
    });
};

const fetchWithTimeout = (url, options, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    ),
  ]);
};


// 오디오 파일 다운로드 함수
const downloadAndPlayAudio = async (audioUrl) => {
  await enableAudio();

  let uri; // 함수의 상위 범위에서 uri 변수를 선언합니다.
  
  try {
    // 오디오 파일을 임시 디렉토리에 다운로드
    const downloadResult = await FileSystem.downloadAsync(
      audioUrl,
      FileSystem.documentDirectory + 'temp_audio.mp3'
    );
    uri = downloadResult.uri; // 다운로드된 파일의 uri를 설정합니다.

    console.log('Downloaded audio to:', uri);
  } catch (error) {
    console.error('download error', error);
    return; // 오류 발생 시 함수 종료
  }
  
  try {
    // 다운로드 완료 후 파일 정보 확인
    const fileInfo = await FileSystem.getInfoAsync(uri);
    console.log('File info:', fileInfo);

    if (fileInfo.exists && fileInfo.size > 0) {
      // 파일이 존재하고 크기가 0보다 큰 경우에만 재생
      const encodedUri = encodeURI(uri);
      const { sound } = await Audio.Sound.createAsync({ uri: encodedUri });
      await sound.playAsync();
    } else {
      console.error('Downloaded file does not exist or is empty.');
    }
  } catch (error) {
    console.error('playing audio error', error);
  }
};

  // 초기 질문 가져오기
  const getInitialQuestion = async () => {
    try {
      const response = await fetch('http://172.20.10.4:5000/initial-question');
      if (response.ok) {
        const result = await response.json();
        console.log('Received audio path:', result.audio_path);
        setResponseText(result.response_text);
        await downloadAndPlayAudio(`http://172.20.10.4:5000${result.audio_path}`);
      } else {
        setResponseText('초기 질문을 불러오는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error fetching initial question', error);
      setResponseText('초기 질문을 불러오는 중 오류가 발생했습니다.');
    }
  };
/*
  // 음성 파일 재생
  const playAudio = async (audioPath) => {
    try {
      const encodedAudioPath = encodeURI(audioPath);
      const { sound } = await Audio.Sound.createAsync({ uri: encodedAudioPath });
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing audio', error);
    }
  };
*/
//-------------------비디오녹화--------------------------------- 

// 비디오 녹화 시작
const startVideoRecording = async () => {
  try {
    // 카메라 권한 요청
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    // 오디오 권한 요청
    const audioStatus = await Audio.requestPermissionsAsync();

    if (cameraStatus.status === 'granted' && audioStatus.status === 'granted') {
      if (cameraRef.current) {
        console.log('Video recording started'); // 녹화 시작 로그 출력
        setIsRecording(true); // 녹화 시작 시 isRecording을 true로 설정

        const videoRecording = await cameraRef.current.recordAsync({
          quality: Camera.Constants.VideoQuality['720p'],
          maxDuration: 60,
        });

        console.log('Video recording finished with URI:', videoRecording.uri);
        setIsRecording(false); // 녹화가 끝나면 isRecording을 false로 설정
        setVideoUri(videoRecording.uri); // videoUri를 설정합니다.
        return videoRecording.uri; // 녹화된 비디오의 URI를 반환
      }
    } else {
      setResponseText('카메라 또는 오디오 권한이 거부되었습니다.');
      return null; // 권한이 거부된 경우 null 반환
    }
  } catch (error) {
    console.error('비디오 녹화 시작 중 오류 발생', error);
    return null; // 오류 발생 시 null 반환
  }
};

// 비디오 녹화 중지
const stopVideoRecording = async () => {
  if (cameraRef.current && isRecording) {
    try {
      console.log('Stopping video recording...');
      await cameraRef.current.stopRecording(); // 비디오 녹화 중지
      setIsRecording(false);
      console.log('Video recording stopped successfully.');
    } catch (error) {
      console.error('Error stopping video recording:', error);
    }
  }
};

  // 비디오 녹화 시작 버튼 핸들러
  const handleRecordingPress = async() => {
    
      await startVideoRecording();
      getInitialQuestion();
    
  };

  
// 저장 버튼 누르면 비디오 녹화 종료 후 저장
const handleSavePress = async () => {
  try {
    // 비디오 녹화 중지
    await stopVideoRecording();

    // 비디오 녹화가 완료된 후에만 서버로 전송
    const uri = videoUri || await startVideoRecording();

    if (uri) {
      // 비디오 파일을 서버로 전송
      const result = await sendVideo(uri);

      // 서버로부터 응답을 받은 후에 네비게이션
      if (result) {
        navigation.navigate('Final', {
          summary: result.summary || '요약 정보가 없습니다.',
          oneLineSummary: result.one_line_summary || '한 줄 요약 정보가 없습니다.',
          imageUrl: result.image_url || '',
        });
      }
    } else {
      console.error('비디오 URI를 가져오지 못했습니다.');
    }
  } catch (error) {
    console.error('저장하는 중 오류 발생:', error);
    Alert.alert('오류', '비디오를 저장하는 중 오류가 발생했습니다. 다시 시도해 주세요.');
  }
};
  /*
  // 저장 버튼 누르면 비디오 녹화 종료
  const handleSavePress = () => {
    stopVideoRecording();
    if (videoUri) {
      sendVideo(videoUri);
    }
  };
*/


// 비디오 파일 서버로 전송
const sendVideo = async (uri) => {
  try {
    console.log('Sending video with URI:', uri); // URI 출력
    const videoFileInfo = await FileSystem.getInfoAsync(uri);
    if (!videoFileInfo.exists) {
      console.error('지정된 URI에 파일이 존재하지 않습니다:', uri);
      return null;
    }
    const formData = new FormData();
    formData.append('videoBlob', {
      uri: uri.replace('file://', ''),
      type: 'video/mov',
      name: 'user_recording.mov',
    });

    const response = await fetch('http://172.20.10.4:5000/save-video', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Server Response:', result);
      return result; // 서버 응답 데이터를 반환
    } else {
      console.log('응답 상태:', response.status);
      return null;
    }
  } catch (error) {
    console.error('비디오 전송 중 오류 발생', error);
    return null;
  }
};


// ---------------------------오디오-----------------------------------


  // 오디오 녹음 시작


  const startAudioRecording = async () => {
    try {
      // 오디오 모드 설정
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,  // iOS에서 녹음을 허용
        playsInSilentModeIOS: true,  // iOS에서 무음 모드에서도 오디오 재생 가능
      });


      const { status } = await Audio.requestPermissionsAsync();
      if (status === 'granted') {
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.startAsync();
        setAudioRecording(recording);
      } else {
        setResponseText('Audio recording permission denied');
      }
    } catch (error) {
      console.error('Error starting audio recording', error);
    }
  };

  const stopAudioRecording = async () => {
    try {
        if (audioRecording) {
            if (!audioRecording._isRecordingStopped) {  // 녹음이 중지되지 않은 상태인지 확인
                await audioRecording.stopAndUnloadAsync();
            } else {
                console.warn("Recording has already been stopped and unloaded.");
            }
            const uri = audioRecording.getURI();
            console.log('Audio file URI:', uri);
            await sendAudio(uri, 'end'); // action을 명시적으로 'end'로 설정
            setIsAudioRecording(false); 
        }
    } catch (error) {
        console.error('Error stopping audio recording', error);
    }
};

const sendAudio = async (uri, action = 'start') => {
    try {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        console.log('File info:', fileInfo);
        if (!fileInfo.exists) {
            console.error('File does not exist at the provided URI:', uri);
            setResponseText('오디오 파일을 찾을 수 없습니다.');
            return;
        }

        const formData = new FormData();
        formData.append('file', {
            uri: uri.replace('file://', ''),  // 'file://' 부분을 제거
            type: 'audio/m4a',  // 파일 타입 설정
            name: 'user_recording.m4a',
        });

        const response = await fetch(`http://172.20.10.4:5000/process-audio?action=${action}`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            setResponseText(result.response_text);

            // 음성 파일을 자동으로 재생
            const audioPath = `http://172.20.10.4:5000${result.audio_path}`;
            if (audioPath) {
                const { sound } = await Audio.Sound.createAsync({ uri: audioPath });
                await sound.playAsync();
            }
        } else {
            console.log('Response status:', response.status);
            setResponseText('처리 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('Error sending audio', error);
        setResponseText('오디오 처리 중 오류가 발생했습니다.');
    }
};

  // 마이크 버튼 핸들러
  const handleAudioRecordingPress = () => {
      if (isAudioRecording) {
        setIsAudioRecording(false);
        stopAudioRecording();
      } else {
        setIsAudioRecording(true);
        startAudioRecording();
      }
  };


//-------------------------style---------------------------------------------------------------------------------


  return (
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>인생필름</Text>
        </View>
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>{responseText}</Text>
        </View>

        <View style={styles.recordingContainer}>
          <Camera ref={cameraRef} style={StyleSheet.absoluteFillObject} type={CameraType.front} />
          <Image source={require('./assets/malang.png')} style={styles.characterImage} />

          <TouchableOpacity 
            onPress={handleAudioRecordingPress} 
            style={isAudioRecording ? styles.micButtonActive : styles.micButton}
          >
            <Image 
              source={isAudioRecording ? require('./assets/mikeOn.png') : require('./assets/mike.png')} 
              style={styles.micIcon} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.goBack()}>
            <Image source={require('./assets/goback.png')} style={styles.footerIcon} />
            <Text style={styles.footerText}>뒤로가기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={handleRecordingPress}>
            <Image source={require('./assets/recording.png')} style={styles.footerIcon} />
            <Text style={styles.footerText}>녹화</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={ async () => {
            await handleSavePress();
            navigation.navigate('Final'); // FinalScreen으로 이동
        }}>
  <Image source={require('./assets/save.png')} style={styles.footerIcon} />
  <Text style={styles.footerText}>저장하기</Text>
</TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
}

//--------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  background: {
    flex: 1,
    justifyContent: 'start',
  },
  titleContainer: {
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '#FFFFFF', // 흰색 배경
    alignItems: 'flex-start', // 글씨를 왼쪽에 배치
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingLeft: 20, // 왼쪽 여백 추가
    marginBottom: 20, // 상단 바 아래 공간 추가
  },
  titleText: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'GowunBatangBold',
  },
  promptContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 20, // 왼쪽 패딩만 줄임
    paddingTop: 0,
    paddingRight:20,
    paddingBottom: 70,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
  },
  promptText: {
    fontFamily: 'GowunBatang',
    fontSize: 22,
    color: '#000000',
  },
  characterImage: {
    position: 'absolute',
    right: -15,
    top: -93,
    width: 170,
    height: 120,
    resizeMode: 'contain',
  },
  recordingContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 200,
    paddingBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#CACACA',
    marginBottom: 60,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  micButtonActive: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  videoButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  footerButton: {
    verticalAlign: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  footerIcon: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
  },
  footerText: {
    fontFamily: 'Pretendard',
    fontSize: 18,
    color: '#787878',
  },
});