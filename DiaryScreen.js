//DiaryScreen.js

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Video } from 'expo-av';
import { useRoute } from '@react-navigation/native';

export default function DiaryScreen() {
  const [fontsLoaded] = useFonts({
    GowunBatangBold: require('./assets/fonts/GowunBatangBold.ttf'), 
    GowunBatang: require('./assets/fonts/GowunBatang.ttf'),
    Pretendard: require('./assets/fonts/Pretendard.ttf'),
    PretendardBlack: require('./assets/fonts/PretendardBlack.ttf'),
    PretendardBold: require('./assets/fonts/PretendardBold.ttf'),
    PretendardLight: require('./assets/fonts/PretendardLight.ttf')
  });

  const [textContent, setTextContent] = useState('');
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { date } = route.params;

  useEffect(() => {
    const fetchTextContent = async () => {
      try {
        const response = await fetch(`https://oasis-joa.s3.ap-northeast-2.amazonaws.com/text/${date.replace(/\./g, '').slice(4)}.txt`);
        const text = await response.text();
        setTextContent(text);
      } catch (error) {
        setTextContent('텍스트를 불러오는 데 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchTextContent();
  }, [date]);

  if (!fontsLoaded) {
    return null;
  }

  const getFormattedDate = () => {
    const dateObj = new Date(date.replace(/\./g, '-')); 
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()];
    return `${year} - ${month} - ${day} (${dayOfWeek})`;
  };

  return (
    <ImageBackground
        source={require('./assets/background.png')}
        style={styles.background}
        >
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>인생필름</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.dateText}>{getFormattedDate()}</Text>

          <View style={styles.videoContainer}>
            <Video 
              source={{ uri: `https://oasis-joa.s3.ap-northeast-2.amazonaws.com/video/${date.replace(/\./g, '').slice(4)}.mp4` }} 
              style={styles.video}
              resizeMode="contain"
              shouldPlay={true}
              isLooping={true}
              useNativeControls
              volume={1.0}
              isMuted={false}
            />
          </View>

          {/* 텍스트를 표시하기 위한 영역 */}
          <View style={styles.textContainer}>
            {loading ? (
              <Text>텍스트를 불러오는 중...</Text>
            ) : (
              <Text style={styles.textContent}>{textContent}</Text>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  titleContainer: {
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingLeft: 20,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'GowunBatangBold',
  },
  body: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    fontSize: 22,
    marginVertical: 10,
    marginTop: 40,
    marginBottom: 0,
    fontFamily: 'PretendardBold', 
    color: '#787878',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: '90%',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textContent: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'GowunBatang',
  },
});
