import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
export default function SignupScreen() {

  const [fontsLoaded] = useFonts({
    GowunBatangBold: require('./assets/fonts/GowunBatangBold.ttf'), 
    GowunBatang: require('./assets/fonts/GowunBatang.ttf'),  
    Pretendard: require('./assets/fonts/Pretendard.ttf'),
    PretendardBlack: require('./assets/fonts/PretendardBlack.ttf'),
    PretendardBold: require('./assets/fonts/PretendardBold.ttf'),
    PretendardLight: require('./assets/fonts/PretendardLight.ttf')
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return null; // 폰트가 로드되지 않았다면 UI를 렌더링하지 않습니다.
  }

  const handleLogin = () => {
    // 여기에서 백엔드와의 로그인 요청을 처리합니다.
    const loginSuccessful = true; // 실제 로그인 로직을 구현하세요.

    if (loginSuccessful) {
      navigation.navigate('Main'); // 홈 화면으로 이동
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.png')}  // 배경 이미지 경로
        style={styles.background}
      ></ImageBackground>

      <View style={styles.header}>
        <Text style={styles.titleText}>내 생에 가장 소중한 기록,</Text>
        <Text style={styles.mainText}>인생일기</Text>

        <Image
          source={require('./assets/silver.png')}  // 하단의 그림 이미지 경로
          style={styles.image}
        />
      </View>

      <View style={styles.body}>
      <TextInput
        style={[styles.input, {fontSize: 18}]}
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, {fontSize: 18}]}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.roginbutton} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <View style = {styles.findBox}>
          <TouchableOpacity style={styles.findButton}>
            <Text style={styles.findText}>아이디 찾기</Text>
          </TouchableOpacity>
          <View style = {styles.spacer}/>
          <TouchableOpacity style={styles.findButton}>
            <Text style={styles.findText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupBox}>
          <Text style={styles.signupText}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.or}>
        <View style={styles.line}/>
        <Text style={styles.orText}>or</Text>
      <View style={styles.line}/>
      </View>

      <TouchableOpacity style={styles.kakaoRogin}>
      <Image source={require('./assets/kakaoRogin.png')} style={styles.kakaoRogin} />
      </TouchableOpacity>
      </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({

  background:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header:{
    position:'absolute',
    top:90,
    width: '100%',
    marginBottom: 0, // 헤더 아래의 간격 조정
  },
  titleText: {
    fontFamily: 'GowunBatang',
    fontSize: 13,
    textAlign: 'center',
    color: '#000',
    marginBottom: 0, // 요소 간 간격
  },
  mainText: {
    fontFamily: 'GowunBatangBold',
    fontSize: 40,
    letterSpacing: 5,
    textAlign: 'center',
    marginBottom: 35, // 요소 간 간격
  },
  image: {
    width: 340,  // 필요에 따라 크기 조정
    height: 210, // 요소 간 간격
  },
  body:{
    width:'100%',
    position:'absolute',
    top:385,
    fontSize:20

  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 0.2,
    borderColor: '#ccc',
    backgroundColor:'#fff',
    marginBottom: 10,
    fontFamily: 'Pretendard',
  },
  roginbutton: {
    backgroundColor: '#407e67',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },

  findBox:{
    flexDirection: 'row',
    justifyContent:'space-between',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15
  },
  findText:{
    fontSize: 18,
    fontFamily: 'Pretendard',
  },
  findButton:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#99DDC4',
    width:'40%',
    height: 50,
    borderRadius: 10,
    borderColor:'#787878',
    borderWidth:0.2,
  },
  spacer:{ 
    width:15},
  signupBox:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#99DDC4',
    width:'100%',
    height: 50,
    borderRadius: 10,
    borderColor:'#787878',
    borderWidth:0.2,
    marginBottom:20
  },
  signupText:{
    fontSize: 18,
    fontFamily: 'Pretendard',
  },
  or:{
    position:'absolute',
    bottom:130,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  line:{
    flex :1,
    height:0.5,
    marginTop:0,
    backgroundColor:'#787878'
  },
  orText:{
    marginHorizontal: 10,
    fontSize: 16,
    color: '#666666',
    fontFamily: 'PretendardLight',
  },
  kakaoRogin: {
    position:'absolute',
    bottom:2,
    alignItems: 'center',
    width:'102%',
    resizeMode:'contain',
  },
});