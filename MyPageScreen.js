import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [fontsLoaded] = useFonts({
    GowunBatangBold: require('./assets/fonts/GowunBatangBold.ttf'), 
    GowunBatang: require('./assets/fonts/GowunBatang.ttf')
  });

  const [isEditingInfo, setIsEditingInfo] = useState(false); // 내 정보 수정 모드 관리
  const [isEditingContacts, setIsEditingContacts] = useState(false); // 비상 연락망 수정 모드 관리
  const [gender, setGender] = useState('김민재');
  const [birthdate, setBirthdate] = useState('1942.05.21');
  const [phone, setPhone] = useState('+82 10-6731-8566');
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: '이민서', relation: '딸', phone: '010 - 3771 - 9649' },
    { name: '이서연', relation: '손녀', phone: '010 - 1483 - 1029' },
    { name: '정의찬', relation: '손주', phone: '010 - 4083 - 5930' },
  ]);

  const navigation = useNavigation();

  if (!fontsLoaded) {
    return null;
  }

  const handleEditInfo = () => {
    setIsEditingInfo(!isEditingInfo);
  };

  const handleEditContacts = () => {
    setIsEditingContacts(!isEditingContacts);
  };

  const handleEmergencyContactChange = (index, key, value) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts[index][key] = value;
    setEmergencyContacts(updatedContacts);
  };

  return (
    <ImageBackground
      source={require('./assets/background.png')}
      style={styles.background}
    >
      <StatusBar style="auto" />
      
      {/* 키보드에 의해 가려지지 않도록 설정 */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* 상단 타이틀 영역 */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>인생필름</Text>
          </View>

          {/* 상단 프로필 영역 */}
          <View style={styles.profileContainer}>
            <Image 
              source={require('./assets/kimminjae.png')} 
              style={styles.profileIcon} 
            />
            <Text style={styles.nameText}>김민재</Text>
          </View>

          {/* 아래 선 */}
          <View style={styles.line} />

          {/* 내 정보 영역 */}
          <View style={styles.infoContainer}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoTitle}>내 정보</Text>
              <TouchableOpacity style={styles.editButton} onPress={handleEditInfo}>
                <Text style={styles.editText}>{isEditingInfo ? '완료' : '수정하기'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>성별</Text>
              {isEditingInfo ? (
                <TextInput
                  style={styles.infoTextInput}
                  value={gender}
                  onChangeText={setGender}
                  selection={{ start: gender.length, end: gender.length }} // 커서를 오른쪽 끝으로 설정
                />
              ) : (
                <Text style={styles.infoText}>{gender}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>생년월일</Text>
              {isEditingInfo ? (
                <TextInput
                  style={styles.infoTextInput}
                  value={birthdate}
                  onChangeText={setBirthdate}
                  selection={{ start: birthdate.length, end: birthdate.length }} // 커서를 오른쪽 끝으로 설정
                />
              ) : (
                <Text style={styles.infoText}>{birthdate}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>내 전화번호</Text>
              {isEditingInfo ? (
                <TextInput
                  style={styles.infoTextInput}
                  value={phone}
                  onChangeText={setPhone}
                  selection={{ start: phone.length, end: phone.length }} // 커서를 오른쪽 끝으로 설정
                />
              ) : (
                <Text style={styles.infoText}>{phone}</Text>
              )}
            </View>
          </View>

          {/* 내 정보와 비상 연락망 사이의 선 */}
          <View style={styles.line} />

          {/* 비상 연락망 영역 */}
          <View style={styles.contactContainer}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoTitle}>비상 연락망</Text>
              <TouchableOpacity style={styles.editButton} onPress={handleEditContacts}>
                <Text style={styles.editText}>{isEditingContacts ? '완료' : '수정하기'}</Text>
              </TouchableOpacity>
            </View>
            {emergencyContacts.map((contact, index) => (
              <View style={styles.contactRow} key={index}>
                {isEditingContacts ? (
                  <>
                    <View style={[styles.contactColumn, styles.leftColumn]}>
                      <TextInput
                        style={[styles.contactInput, styles.underline]}  // 첫 번째 칸: 이름
                        value={contact.name}
                        onChangeText={(text) => handleEmergencyContactChange(index, 'name', text)}
                        selection={{ start: contact.name.length, end: contact.name.length }}
                        placeholder="이름"
                      />
                    </View>
                    <View style={[styles.contactColumn, styles.middleColumn]}>
                      <TextInput
                        style={[styles.contactInput, styles.underline]}  // 두 번째 칸: 관계
                        value={contact.relation}
                        onChangeText={(text) => handleEmergencyContactChange(index, 'relation', text)}
                        selection={{ start: contact.relation.length, end: contact.relation.length }}
                        placeholder="관계"
                      />
                    </View>
                    <View style={[styles.contactColumn, styles.rightColumn]}>
                      <TextInput
                        style={[styles.contactInput, styles.underline]}  // 세 번째 칸: 전화번호
                        value={contact.phone}
                        onChangeText={(text) => handleEmergencyContactChange(index, 'phone', text)}
                        selection={{ start: contact.phone.length, end: contact.phone.length }}
                        placeholder="전화번호"
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <Text style={styles.contactLabel}>{contact.name}</Text>
                    <Text style={styles.contactText}>{contact.relation}</Text>
                    <Text style={styles.contactText}>{contact.phone}</Text>
                  </>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 100,
  }, 
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
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
    fontSize: 24,
    color: '#000',
    fontFamily: 'GowunBatangBold',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -15,
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
    justifyContent: 'space-between',
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
    color: '#000',
    fontFamily: 'GowunBatang',
    textAlign: 'right',
  },
  infoTextInput: {
    fontSize: 18,
    color: '#777',
    fontFamily: 'GowunBatang',
    textAlign: 'right',
    borderBottomWidth: 1,
    borderBottomColor: '#777',
    width: '50%',
    padding: 0,
  },
  contactContainer: {
    width: '90%',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  contactColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  contactInput: {
    fontSize: 18,
    color: '#777',
    fontFamily: 'GowunBatang',
    paddingVertical: 5,
    width: '100%',
  },
  leftColumn: {
    flex: 0.5,
    paddingRight: 5, // 왼쪽 칸 패딩
  },
  middleColumn: {
    flex: 0.5,
    paddingLeft: 5,  // 가운데 칸 패딩
    paddingRight: 5, // 오른쪽 칸과의 분리
  },
  rightColumn: {
    paddingLeft: 5, // 오른쪽 칸 패딩
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#777',
  },
  contactLabel: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'GowunBatangBold',
    textAlign: 'left',
  },
  contactText: {
    fontSize: 18,
    color: '#000',
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
    fontSize: 18,
    color: '#777',
    fontFamily: 'GowunBatangBold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 50,
    paddingVertical: 20,
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
