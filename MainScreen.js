import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const [fontsLoaded] = useFonts({
    GowunBatangBold: require('./assets/fonts/GowunBatangBold.ttf'), 
    GowunBatang: require('./assets/fonts/GowunBatang.ttf'),  // 폰트 경로 지정
    Pretendard: require('./assets/fonts/Pretendard.ttf'),
    PretendardBlack: require('./assets/fonts/PretendardBlack.ttf'),
    PretendardBold: require('./assets/fonts/PretendardBold.ttf'),
    PretendardLight: require('./assets/fonts/PretendardLight.ttf')
  });
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return null;
  }

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    return `${year} - ${month} - ${day} (${dayOfWeek})`;
  }

  return (
    <ImageBackground
        source={require('./assets/background.png')}
        style = {styles.background}
        >
      <StatusBar style="auto" />
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}>인생일기</Text>
      </View >

      <View style={styles.helpSection}>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpText}>도움이 필요하신가요?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpImage}>
          <Image source={require('./assets/malangHi.png')} style={styles.helpImage}/>
        </TouchableOpacity>
        </View>
      <View style={styles.body}>
        <Text style={styles.questionText}>오늘, 당신의 하루는</Text>
        <Text style={styles.questionText}>어떠셨나요?</Text>
        <TouchableOpacity 
        style={styles.camerButton}
        onPress={() => navigation.navigate('Recording')}>
          <Image source={require('./assets/camera.png')} style={styles.cameraImage} />
         </TouchableOpacity>
         <Text style={styles.dateText}>{getCurrentDate()}</Text>
         <TouchableOpacity 
         style={styles.writeDiaryButton}
         onPress={() => navigation.navigate('Recording')}>
          <Text style={styles.writeDiaryText}>오늘의 일기 쓰기 </Text>
          <Icon name="chevron-right" size={24} color= "#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => navigation.navigate('ViewVideo')}>
          <Image source={require('./assets/calendar.png')} 
          style={styles.footerIcon} 
          />
          <Text style={styles.footerText}>일기</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => navigation.navigate('Main')}
        >
          <Image source={require('./assets/home.png')} 
          style={styles.footerIcon} />
          <Text style={styles.footerText}
          onPress={() => navigation.navigate('MyPage')}>처음으로</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => navigation.navigate('MyPage')}>
          <Image source={require('./assets/profile.png')} style={styles.footerIcon} />
          <Text style={styles.footerText}>내 정보</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
}
  
const styles = StyleSheet.create({
  background: {
    flex:1,
  },
  container: {
    flex: 1,
    paddingBottom: 100
  }, 
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 45,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: 'GowunBatangBold',
  },
  helpSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'center',
    marginTop:10,
    height:60,
    marginBottom:30
  },
  helpButton: {
    backgroundColor:'#fff',
    borderRadius: 10,
    marginTop:0,
    marginRight:10,
    width:180,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    
  },
  helpText: {
    fontSize: 16,
    fontFamily: 'Pretendard',
  },
  helpImage: {
    width: 40,
    height: 60,
  },

  body: {
    width:'100%',
    alignItems:'center',
    marginTop:10
  },
  questionText: {
    fontSize: 28,
    marginVertical: 0,
    lineHeight:35,
    fontFamily: 'GowunBatang',  // 여기서 고운바탕볼드 폰트를 적용합니다.
    marginTop: 0,
  },
  cameraImage: {
    width: 250,
    height: 200,
    marginTop:20,
    resizeMode:'contain'
  },
  dateText: {
    fontSize: 22,
    fontWeight: 'GowunBatang',
    marginVertical: 10,
    marginTop:40,
    marginBottom: 0,
    fontFamily: 'PretendardBold', 
    color : '#787878' 
  },
  writeDiaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#407e67',
    borderRadius:10,
    paddingVertical: 10,
    paddingRight:15,
    paddingHorizontal: 50,
    marginTop: 10,
  },
  writeDiaryText: {
    marginRight:30,
    fontSize: 20,
    color: '#fff',
    fontFamily: 'GowunBatangBold',  // 여기서 고운바탕볼드 폰트를 적용합니다.
  },
  footer: {
    position:'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignContent:'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  footerButton: {
    verticalAlign:'row',
    alignItems: 'center',
    marginHorizontal: 10
  },
  cameraButton:{
    alignItems: 'center',
  },
  footerIcon: {
    width: 80,
    height: 80,
    marginHorizontal: 10
  },
  footerText: {
    marginTop:5,
    fontSize: 20,
    color: '#787878',
    fontFamily: 'Pretendard',  // 여기서 -Bold 폰트를 적용합니다.
  },
});