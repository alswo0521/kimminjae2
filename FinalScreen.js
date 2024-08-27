import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function FinalScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log('Received params in FinalScreen:', route.params);
  const { summary, oneLineSummary, imageUrl, diary } = route.params || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!summary && !imageUrl && !diary) {
      console.error('요약 정보 또는 이미지가 제공되지 않았습니다.');
      setLoading(false);
      return;
    }

    // 로딩 상태 해제
    setLoading(false);
  }, [summary, imageUrl, diary]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>인생필름</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <TouchableOpacity onPress={() => console.log('메인 이미지가 클릭되었습니다.')}>
              <Image source={{ uri: imageUrl }} style={{ width: 375, height: 230 }} />
            </TouchableOpacity>
          ) : (
            <Text>이미지가 없습니다.</Text>
          )}
          <View style={styles.summaryContainer}>
            <Text style={styles.sectionTitle}>"말랑이의 조언"</Text>
            <Text style={styles.summaryText}>{summary || '요약 정보가 없습니다.'}</Text>
          </View>
          <View style={styles.diaryContainer}>
            <Text style={styles.sectionTitle}>"오늘의 일기"</Text>
            <Text style={styles.summaryText}>{diary || '일기 정보가 없습니다.'}</Text>
          </View>
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
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingLeft: 20,
    marginBottom: 0,
  },
  titleText: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'GowunBatangBold',
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: 150, // 하단 footer에 의해 가려지지 않도록 추가 여백
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
  },
  summaryContainer:{
    width: '95%',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  diaryContainer: {
    width: '95%',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'GowunBatangBold',
  },
  summaryText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
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
    paddingVertical: 10,
    bottom: 0,
  },
  footerButton: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  footerIcon: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
  },
  footerText: {
    marginTop: 5,
    fontSize: 20,
    color: '#787878',
    fontFamily: 'Pretendard',
  },
});
