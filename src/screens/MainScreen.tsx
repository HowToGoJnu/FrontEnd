import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  ScrollView,
  StatusBar,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CalendarIcon from '../icons/icon_calendar.svg';
import AlarmIcon from '../icons/icon_alarm.svg';
import {SubjectType} from '../../types';

function MainScreen() {
  const days = ['월', '화', '수', '목', '금'];
  const colors = [
    'pink',
    'green',
    'blue',
    'darkblue',
    'yellow',
    'brown',
    'purple',
  ];
  const hours = [9, 10, 11, 12, 1, 2, 3, 4];
  const [modalVisible, setModalVisible] = useState(false);
  const initialData: SubjectType = {
    Subject: '',
    Building: '',
    StartTime: '',
    EndTime: '',
    Day: '',
    Color: '',
  };
  const [subjectData, setSubjectData] = useState<SubjectType>(initialData);
  const [schedule, setSchedule] = useState<SubjectType[]>([]);

  function clearSubject() {
    setSubjectData(initialData);
  }

  function addSubjectToSchedule() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newSubject = {...subjectData, Color: randomColor};

    setSchedule([...schedule, newSubject]);
    setModalVisible(false);
    clearSubject();
  }

  function renderSubjects(day: string, hour: number) {
    return schedule
      .filter(subject => {
        const startTime = parseInt(subject.StartTime);
        const endTime = parseInt(subject.EndTime);
        return subject.Day === day && hour >= startTime && hour < endTime;
      })
      .map((subject, i) => {
        const startTime = parseInt(subject.StartTime);
        const endTime = parseInt(subject.EndTime);
        const height = ((endTime - startTime) * 100).toString();
        console.log(i);
        return (
          <View
            key={i}
            style={{backgroundColor: subject.Color, height: height}}
            className="absolute inset-x-0 top-0 w-full justify-center items-center">
            <Text className="text-center text-white">
              {subject.Subject} ({subject.Building})
            </Text>
          </View>
        );
      });
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle="default" />
      <View className="flex w-screen h-screen items-center bg-white">
        <View className="flex w-11/12 h-[60px] justify-end">
          <Text className="font-inter-r text-primary-green">
            2024년 여름 학기
          </Text>
          <View className="flex flex-row w-full h-auto justify-between items-center">
            <View className="flex flex-row w-auto h-auto justify-center items-center">
              <CalendarIcon width={20} height={20} />
              <Text className="font-inter text-xl text-black mx-1">시간표</Text>
            </View>
            <Pressable>
              <AlarmIcon width={30} height={20} />
            </Pressable>
          </View>
        </View>
        <View className="w-11/12 h-[10px]" />
        <View className="flex flex-grow w-11/12 h-full">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex w-full h-auto mb-20 bg-white">
              <View className="flex w-auto h-auto border border-gray-300 rounded-xl">
                {/* Header Row */}
                <View className="flex flex-row justify-between items-center border-b border-gray-300">
                  <View className="w-1/6 p-2">
                    <Text className="text-center">시간</Text>
                  </View>
                  {days.map((day, index) => (
                    <View key={index} className="w-1/6 p-2">
                      <Text className="text-center">{day}</Text>
                    </View>
                  ))}
                </View>
                {hours.map((hour, rowIndex) => (
                  <View
                    key={rowIndex}
                    className="flex flex-row justify-between items-center border-b border-gray-300 relative">
                    <View className="w-1/6 p-2">
                      <Text className="text-center">{hour}</Text>
                    </View>
                    {days.map((day, colIndex) => (
                      <View
                        key={colIndex}
                        className="w-1/6 h-16 border-l border-gray-300 relative">
                        {renderSubjects(day, hour)}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
              <View className="flex w-full h-[10px] bg-white" />
              <View className="flex w-full h-[150px] bg-white border border-gray-300 rounded-lg justify-center items-center">
                <View className="flex flex-col w-full h-auto items-center">
                  <Text className="font-inter text-lg mb-2">
                    시간표 및 장소 추가
                  </Text>
                  <Pressable
                    onPress={() => {
                      setModalVisible(true);
                    }}
                    className="flex w-2/5 h-auto bg-primary-green rounded-2xl shadow-md shadow-black/50">
                    <View className="flex flex-row w-full h-auto items-center justify-between px-4 py-1">
                      <Text className="font-inter text-sm text-white">
                        시간표 및 장소
                      </Text>
                      <Text className="font-inter text-lg text-white">+</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View className=" bg-black/75 h-screen w-screen items-center justify-center">
            <View className="w-4/5 h-3/5 bg-white rounded-lg items-center justify-between px-4 py-8 shadow-lg shadow-black">
              <Text className="text-left font-inter text-sm text-black">
                수업 이름, 장소, 요일, 시간을 입력해주세요
              </Text>
              <View className="flex w-full h-4/5">
                <View className="flex flex-row w-full h-1/4 items-center">
                  <Text className="font-inter-r text-black">과목명</Text>
                  <View className="flex w-3/4 h-2/3 px-1 border-b border-black/50">
                    <TextInput
                      className="font-inter-r text-black"
                      placeholder="수업 이름"
                      onChangeText={text =>
                        setSubjectData({...subjectData, Subject: text})
                      }
                    />
                  </View>
                </View>
                <View className="flex flex-row w-full h-1/4 items-center">
                  <Text className="font-inter-r text-black">건물명</Text>
                  <View className="flex w-3/4 h-2/3 px-1 border-b border-black/50">
                    <TextInput
                      className="font-inter-r text-black"
                      placeholder="건물 이름(호관 기재)"
                      onChangeText={text =>
                        setSubjectData({...subjectData, Building: text})
                      }
                    />
                  </View>
                </View>
                <View className="flex flex-row w-full h-1/5 items-center">
                  <Text className="font-inter-r text-black">요일{'   '}</Text>
                  <View className="flex w-3/4 h-2/3 px-1 border-b border-black/50">
                    <TextInput
                      className="font-inter-r text-black"
                      placeholder="요일 (ex.월)"
                      onChangeText={text =>
                        setSubjectData({...subjectData, Day: text})
                      }
                    />
                  </View>
                </View>
                <View className="flex flex-row w-full h-1/5 items-center">
                  <Text className="font-inter-r text-black">시간{'   '}</Text>
                  <View className="flex flex-row w-3/4 justify-between">
                    <View className="flex w-2/5 h-2/3 px-1 border-b border-black/50">
                      <TextInput
                        className="font-inter-r text-black"
                        placeholder="시작시간"
                        onChangeText={text =>
                          setSubjectData({
                            ...subjectData,
                            StartTime: text,
                          })
                        }
                      />
                    </View>
                    <View className="flex w-2/5 h-2/3 px-1 border-b border-black/50">
                      <TextInput
                        className="font-inter-r text-black"
                        placeholder="종료시간"
                        onChangeText={text =>
                          setSubjectData({...subjectData, EndTime: text})
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View className="flex-row justify-between w-full">
                <TouchableOpacity
                  className="rounded-md bg-primary-green w-[45%] py-2 justify-center items-center"
                  onPress={addSubjectToSchedule}>
                  <Text className="text-white font-inter-sb text-s text-center">
                    완료
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="rounded-md bg-primary-green w-[45%] py-2 justify-center items-center"
                  onPress={() => {
                    clearSubject();
                    setModalVisible(false);
                  }}>
                  <Text className="text-white font-inter-sb text-s text-center">
                    취소
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

export default MainScreen;
