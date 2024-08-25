import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [fontsLoaded] = useFonts({
    GowunBatangBold: require('./assets/fonts/GowunBatangBold.ttf'), 
    GowunBatang: require('./assets/fonts/GowunBatang.ttf')
  });

  const navigation = useNavigation();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('./assets/background.png')}
      style={styles.background}
    >
      <StatusBar style="auto" />

      {/* 상단 타이틀 영역 */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>인생필름</Text>
      </View>

      <View style={styles.container}>
        {/* 상단 프로필 영역 */}
        <View style={styles.profileContainer}>
          <Image 
            source={require('./assets/profile.png')} 
            style={styles.profileIcon} 
          />
          <Text style={styles.nameText}>이서연</Text>
        </View>

        {/* 아래 선 */}
        <View style={styles.line} />

        {/* 내 정보 영역 */}
        <View style={styles.infoContainer}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoTitle}>내 정보</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>수정하기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>성별</Text>
            <Text style={styles.infoText}>여성</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>생년월일</Text>
            <Text style={styles.infoText}>2003.10.12</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>내 전화번호</Text>
            <Text style={styles.infoText}>+82 10-6687-9737</Text>
          </View>
        </View>

        {/* 내 정보와 비상 연락망 사이의 선 */}
        <View style={styles.line} />

        {/* 비상 연락망 영역 */}
        <View style={styles.contactContainer}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoTitle}>비상 연락망</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>수정하기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.contactLabel}>김옥지 | 딸</Text>
            <Text style={styles.contactText}>+82 10 - 0000 - 0000</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.contactLabel}>김옥지 | 딸</Text>
            <Text style={styles.contactText}>+82 10 - 0000 - 0000</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.contactLabel}>김옥지 | 딸</Text>
            <Text style={styles.contactText}>+82 10 - 0000 - 0000</Text>
          </View>
        </View>

        {/* Footer 부분 */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.footerButton}
            onPress={() => navigation.navigate('ViewVideo')}
          >
            <Image source={require('./assets/calendar.png')} style={styles.footerIcon} />
            <Text style={styles.footerText}>일기</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerButton}
            onPress={() => navigation.navigate('Main')}
          >
            <Image source={require('./assets/home.png')} style={styles.footerIcon} />
            <Text style={styles.footerText}>처음으로</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerButton}
            onPress={() => navigation.navigate('MyPage')}
          >
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },

  // 상단 타이틀 스타일
  titleContainer: {
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '#FFFFFF', // 흰색 배경
    alignItems: 'flex-start', // 글씨를 왼쪽에 배치
    paddingTop: 60,
    paddingLeft: 20, // 왼쪽 여백 추가
    marginBottom: 30, // 상단 바 아래 공간 추가
  },
  titleText: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'GowunBatangBold',
  },

  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  profileIcon: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 22,
    color: '#000',
    fontFamily: 'GowunBatangBold',
  },

  line: {
    width: '90%',
    height: 1,
    backgroundColor: '#000',
    marginVertical: 20,
  },

  infoContainer: {
    width: '90%',
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'GowunBatangBold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 양 끝으로 정렬
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  infoLabel: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'GowunBatangBold',
    textAlign: 'left',
  },
  infoText: {
    fontSize: 18,
    color: '#777',
    fontFamily: 'GowunBatang',
    textAlign: 'right',
  },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#EAEAEA',
    borderRadius: 5,
  },
  editText: {
    fontSize: 16,
    color: '#777',
    fontFamily: 'GowunBatangBold',
  },

  contactContainer: {
    width: '90%',
  },
  contactLabel: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'GowunBatangBold',
    textAlign: 'left',
  },
  contactText: {
    fontSize: 18,
    color: '#777',
    fontFamily: 'GowunBatang',
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 150,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 0,
    paddingBVertical: 10,
    bottom:0
  },
  footerButton: {
    verticalAlign:'row',
    alignItems: 'center',
    marginHorizontal: 10
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