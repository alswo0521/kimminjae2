import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={prevMonth}>
                <Image source={require('./assets/leftarrow.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
                <Text style={styles.monthText}>{format(currentMonth, 'M')}월</Text>
            </View>
            <TouchableOpacity onPress={nextMonth}>
                <Image source={require('./assets/rightarrow.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
        </View>
    );
};

const RenderDays = () => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <View style={styles.daysRow}>
            {days.map((day, index) => (
                <Text style={styles.day} key={index}>{day}</Text>
            ))}
        </View>
    );
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            const formattedDate = format(day, 'd');
            const cloneDay = day;

            days.push(
                <TouchableOpacity
                    style={[
                        styles.cell,
                        !isSameMonth(day, monthStart) ? styles.disabled : isSameDay(day, selectedDate) ? styles.selected : null,
                    ]}
                    key={day.toString()} // 고유한 키로 변경
                    onPress={() => onDateClick(new Date(cloneDay))} // 날짜 객체를 직접 넘김
                >
                    <Text style={!isSameMonth(day, monthStart) ? styles.notValidText : styles.validText}>
                        {formattedDate}
                    </Text>
                </TouchableOpacity>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <View style={styles.weekRow} key={day.toString()}>
                {days}
            </View>
        );
        days = [];
    }
    return <View>{rows}</View>;
};

export default function CalendarScreen() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigation = useNavigation();

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const onDateClick = (day) => {
        setSelectedDate(day);
        console.log(`Selected date: ${format(day, 'yyyy-MM-dd')}`);
    };

    return (
        <ImageBackground source={require('./assets/background.png')} style={styles.background}>
            <View style={styles.container}>
                {/* 상단 타이틀 영역 */}
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>인생필름</Text>
                </View>

                {/* 달력 영역 */}
                <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
                <RenderDays />
                <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} />

                {/* Footer 부분 */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('ViewVideo')}>
                        <Image source={require('./assets/calendar.png')} style={styles.footerIcon} />
                        <Text style={styles.footerText}>일기</Text>
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
        width: '100%',
        padding: 0, // 패딩 제거
        alignItems: 'center', // 중앙 정렬
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        width: '80%', // 화면에 꽉 차도록 수정
    },
    headerTextContainer: {
        alignItems: 'center', // 텍스트를 가운데 정렬
    },
    yearText: {
        fontSize: 24, // 연도 텍스트 크기
        fontFamily: 'GowunBatangBold',
        paddingBottom: 10,
    },
    monthText: {
        fontSize: 26,
        fontFamily: 'GowunBatangBold',
    },
    arrowIcon: {
        width: 40, // 아이콘 크기를 조절
        height: 40, // 아이콘 크기를 조절
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        width: '90%', // 전체 폭을 맞추도록 수정
    },
    day: {
        fontSize: 28,
        fontFamily: 'GowunBatang',
        width: '15%',
        textAlign: 'center',
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%', // 전체 폭을 맞추도록 수정
    },
    cell: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    disabled: {
        backgroundColor: '#E0E0E0',
    },
    selected: {
        backgroundColor: '#FF6347',
    },
    validText: {
        fontSize: 28,
        color: '#000',
    },
    notValidText: {
        fontSize: 28,
        color: '#CCC',
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