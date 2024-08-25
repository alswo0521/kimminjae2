import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FinalScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>인생필름</Text>
        </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={require('./assets/exPhoto1.jpg')} style={styles.mainImage} />
        <Text style={styles.message}>
          이 사진은 당신이 녹화한 영상의 대표 이미지입니다. 이 순간은 당신에게 특별한 의미가 있을 것입니다. 
          아마도 중요한 이벤트나 소중한 사람과의 순간이 담겨 있을 것입니다. 이 장면을 통해 당신이 
          느꼈던 감정과 생각이 다시 떠오를 것입니다. 이 이미지는 당신의 기억을 되살리고, 앞으로도 
          기억하고 싶은 순간으로 남을 것입니다. 우리의 삶은 이러한 작은 순간들로 채워져 있으며, 
          그 순간들을 기록하고 보존하는 것이 중요합니다. 이 이미지는 그러한 소중한 순간의 증거입니다. 
          이 사진을 볼 때마다 그 순간의 감정을 되새기며, 앞으로도 당신의 이야기를 계속 기록해 나가시기 바랍니다.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('ViewVideo')}>
          <Image source={require('./assets/calendar.png')} style={styles.footerIcon} />
          <Text style={styles.footerText}>일기 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Main')}>
          <Image source={require('./assets/home.png')} style={styles.footerIcon} />
          <Text style={styles.footerText}>처음으로</Text>
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
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        paddingTop: 50,
        paddingLeft: 20,
        marginBottom: 30,
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
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal:10,
    fontFamily: 'GowunBatangBold',
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