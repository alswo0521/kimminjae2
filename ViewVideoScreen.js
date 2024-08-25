import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function DiaryScreen() {
  const [fontsLoaded] = useFonts({
    GowunBatangBold: require('./assets/fonts/GowunBatangBold.ttf'),
    GowunBatang: require('./assets/fonts/GowunBatang.ttf'),
  });

  const navigation = useNavigation();

  if (!fontsLoaded) {
    return null;
  }

  const handleCalendarPress = () => {
    console.log('캘린더 아이콘이 클릭되었습니다.');
  };

  const handleVideoPress = (date) => {
    console.log(`${date}의 영상이 클릭되었습니다.`);
  };

  const videoData = [
    { date: '2024.08.23', thumbnail: require('./assets/exPhoto1.jpg'), description: '이 날은 야구장에서 양현종의 완투승을 찍은 영상' },
    { date: '2024.08.22', thumbnail: require('./assets/exPhoto2.jpg'), description: '집 안에서 강아지 뿡순이에게 옷을 입히는 영상' },
    { date: '2024.08.21', thumbnail: require('./assets/exPhoto3.jpg'), description: '집 안에서 뿡순이의 옷과 함께 모자를 씌워주는 영상' },
    { date: '2024.08.20', thumbnail: require('./assets/exPhoto4.jpg'), description: '우연히 간 교토의 술집의 안주를 먹는 영상' },
    { date: '2024.08.19', thumbnail: require('./assets/exPhoto5.jpg'), description: '유니버셜 스튜디오의 음식점에서 피자를 먹는 영상' },
    { date: '2024.08.18', thumbnail: require('./assets/exPhoto6.jpg'), description: '공원에서 평화로운 오후를 즐기며 찍은 영상' },
  ];

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
            <Image source={video.thumbnail} style={styles.thumbnailImage} />
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
  // 상단 타이틀 스타일
  titleContainer: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF', // 흰색 배경
    alignItems: 'flex-start', // 글씨를 왼쪽에 배치
    paddingTop: 50,
    paddingLeft: 20, // 왼쪽 여백 추가
    marginBottom: 30, // 상단 바 아래 공간 추가
  },
  titleText: {
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
    flex: 1,
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
    height:160,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    paddingBVertical: 0,
    bottom:0
  },
  footerButton: {
    verticalAlign:'row',
    alignItems: 'center',
  },
  footerIcon: {
    width: 80,
    height: 80,
    marginHorizontal: 0
  },
  footerText: {
    marginTop:5,
    fontSize: 20,
    color: '#787878',
    fontFamily: 'Pretendard',  // 여기서 -Bold 폰트를 적용합니다.
  },
}); 