import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import SignupScreen from './SignupScreen';
import ViewVideoScreen from './ViewVideoScreen';
import MyPageScreen from './MyPageScreen';
import RecordingScreen from './RecordingScreen';
import FinalScreen from './FinalScreen'; // FinalScreen 추가
import CalendarScreen from './CalendarScreen'; // CalendarScreen 추가

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen 
          name="Main" 
          component={MainScreen}
          options={{ title: '메인 화면', headerShown: false }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={{headerShown:false}}
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
        <Stack.Screen 
          name="Calendar" 
          component={CalendarScreen} // CalendarScreen 추가
          options={{ title: '캘린더', headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
