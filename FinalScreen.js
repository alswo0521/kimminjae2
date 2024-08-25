import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function FinalScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log('Received params in FinalScreen:', route.params);
  const { summary, oneLineSummary, imageUrl } = route.params || {}; // 전달된 요약 정보 및 이미지 URL

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!summary && !oneLineSummary && !imageUrl) {
      console.error('요약 정보 또는 이미지가 제공되지 않았습니다.');
      setLoading(false);
      return;
    }

    // 로딩 상태 해제
    setLoading(false);
  }, [summary, oneLineSummary, imageUrl]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>인생필름</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <TouchableOpacity onPress={() => console.log('메인 이미지가 클릭되었습니다.')}>
              <Image source={{ uri: imageUrl }} style={styles.mainImage} />
            </TouchableOpacity>
          ) : (
            <Text>이미지가 없습니다.</Text>
          )}
          <Text style={styles.summaryText}>{summary || '요약 정보가 없습니다.'}</Text>
          <Text style={styles.oneLineSummaryText}>{oneLineSummary || '한 줄 요약 정보가 없습니다.'}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Main')}>
          <Image source={require('./assets/home.png')} style={styles.footerIcon} />
          <Text style={styles.footerText}>처음으로</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('ViewVideo')}>
          <Image source={require('./assets/calendar.png')} style={styles.footerIcon} />
          <Text style={styles.footerText}>일기 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('MyPage')}>
          <Image source={require('./assets/profile.png')} style={styles.footerIcon} />
          <Text style={styles.footerText}>내 정보</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    paddingTop: 0,
  },
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
  scrollView: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
  },
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
    fontFamily: 'GowunBatangBold',
  },
  oneLineSummaryText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
    fontFamily: 'GowunBatang',
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