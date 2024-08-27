import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

export default function ViewVideoScreen() { 
  const [fontsLoaded] = useFonts({
    GowunBatangBold: require('./assets/fonts/GowunBatangBold.ttf'),
    GowunBatang: require('./assets/fonts/GowunBatang.ttf'),
  });

  const navigation = useNavigation();
  const [videoData, setVideoData] = useState([
    { date: '2024.08.27', thumbnail: require('./assets/exPhoto0.webp'), description: '호텔에서 코딩하며 새로운 도전을 즐겼다.' },
    { date: '2024.08.26', thumbnail: require('./assets/exPhoto1.jpg'), description: '마을회관에서 어르신들과 시원한 수박 나눠 먹으며 즐거운 시간을 보냈다.' },
    { date: '2024.08.24', thumbnail: require('./assets/exPhoto2.jpg'), description: '오랫동안 미뤘던 대청소를 마치고 깨끗해진 집에서 여유로운 시간을 보냈다.' },
    { date: '2024.08.21', thumbnail: require('./assets/exPhoto3.jpg'), description: '직접 담근 김치로 끓인 김치찌개로 만족스러운 저녁을 즐겼다.' },
    { date: '2024.08.20', thumbnail: require('./assets/exPhoto4.jpg'), description: '오늘 감자 수확하며 허리는 아팠지만, 수확의 기쁨과 가족과의 저녁이 기대되는 날이었다.' },
  ]);

  if (!fontsLoaded) {
    return null;
  }

  const handleCalendarPress = () => {
    navigation.navigate('Calendar');
  };

  const handleVideoPress = (date) => {
    if (date === '2024.08.27') {
      console.log(`${date}의 영상이 클릭되었습니다.`);
      navigation.navigate('Diary', { 
        date, 
        customDescription: '이 내용은 8월 27일에 대한 맞춤형 설명입니다. 호텔에서 코딩하며 새로운 도전을 즐겼고, 그 경험은 무척 흥미로웠습니다.' 
      });
    } else {
      console.log(`${date}의 영상이 클릭되었습니다.`);
      navigation.navigate('Diary', { date });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>인생필름</Text>
      </View>
      <View style={styles.calendarTipContainer}>
        <TouchableOpacity onPress={handleCalendarPress} style={styles.calendarButton}>
          <Image source={require('./assets/calendar.png')} style={styles.calendarIcon} />
        </TouchableOpacity>
        <Text style={styles.tipText}>달력을 누르면 원하는 날의 영상을 볼 수 있어요</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {videoData.map((video, index) => (
          <TouchableOpacity key={index} style={styles.videoContainer} onPress={() => handleVideoPress(video.date)}>
            <Image source={video.thumbnail} style={{ 
              width: 125, 
              height: 125, 
              marginRight: 21,
              borderRadius: 10,
            }}  />
            <View style={styles.textContainer}>
              <Text style={styles.dateText}>{video.date}</Text>
              <Text style={styles.descriptionText}>{video.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {videoData.length === 0 && (
          <Text style={styles.emptyText}>아직 촬영된 영상이 없습니다.</Text>
        )}
      </ScrollView>
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
    marginBottom: 30,
  },
  titleText: {
    marginRight: 2,
    fontSize: 24,
    color: '#000',
    fontFamily: 'GowunBatangBold',
  },
  calendarTipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    width: '90%',
  },
  calendarButton: {
    marginRight: 10,
  },
  calendarIcon: {
    width: 70,
    height: 70,
  },
  tipText: {
    fontSize: 20,
    fontFamily: 'GowunBatang',
    color: '#444',
    flexWrap: 'wrap',
    flex: 1,
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: 150,
  },
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
    marginBottom: 20,
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  textContainer: {
    height: '100%',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  dateText: {
    fontSize: 24,
    fontFamily: 'GowunBatangBold',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: 'GowunBatang',
    color: '#555',
  },
  emptyText: {
    fontSize: 20,
    fontFamily: 'GowunBatang',
    color: '#888',
    marginTop: 50,
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 160,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    bottom: 0,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 80,
    height: 80,
  },
  footerText: {
    marginTop: 5,
    fontSize: 20,
    color: '#787878',
    fontFamily: 'Pretendard',
  },
});
