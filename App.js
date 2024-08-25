import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import ViewVideoScreen from './ViewVideoScreen';
import MyPageScreen from './MyPageScreen';
import RecordingScreen from './RecordingScreen';
import SignupScreen from './SignupScreen';
import FinalScreen from './FinalScreen'; // FinalScreen 추가
import * as SplashScreen from 'expo-splash-screen';


const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // 스플래시 화면이 자동으로 사라지지 않도록 설정
        await SplashScreen.preventAutoHideAsync();

        // 초기화 작업 (예: 데이터 로드, 폰트 로드 등)
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      } finally {
        // 스플래시 화면을 숨기고 메인 화면으로 전환
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, []);

  if (!appIsReady) {
    return null; // 앱이 준비되기 전까지는 아무것도 렌더링하지 않음
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={{ title: '메인 화면', headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          component={MainScreen}
          options={{ title: '메인 화면', headerShown: false }} 
        />
        <Stack.Screen 
          name="ViewVideo" 
          component={ViewVideoScreen}
          options={{ title: '비디오 화면', headerShown: false }}
        />
        <Stack.Screen 
          name="MyPage" 
          component={MyPageScreen}
          options={{ title: '마이 페이지', headerShown: false }}
        />
        <Stack.Screen 
          name="Recording" 
          component={RecordingScreen}
          options={{ title: '녹화 화면', headerShown: false }} 
        />
        <Stack.Screen 
          name="Final" 
          component={FinalScreen}
          options={{ title: '최종 화면', headerShown: false }} // FinalScreen 등록
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
