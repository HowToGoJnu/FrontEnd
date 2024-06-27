import React from 'react';
import {SafeAreaView, View, Pressable, Text, StatusBar} from 'react-native';
import {RootStackParamList} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import StoneIcon from '../icons/icon_stoneGranpa.svg';

type StartScreenProps = NativeStackScreenProps<RootStackParamList, 'Start'>;

function StartScreen({navigation}: StartScreenProps) {
  return (
    <SafeAreaView>
      <StatusBar barStyle="default" />
      <View className="flex w-screen h-screen bg-white items-center">
        <View className="flex w-11/12 h-4/5 items-center justify-start">
          <View className="flex w-full h-2/3 items-center justify-end">
            <View className="flex flex-wrap flex-col w-auto h-auto items-center justify-center">
              <StoneIcon width={130} height={130} />
              <Text className="font-inter-r text-black/80 text-[14px]">
                제주대학교 전용 시간표 어플리케이션
              </Text>
              <Text className="font-inter text-primary-green text-[30px]">
                어떵가코
              </Text>
            </View>
          </View>
        </View>
        <View className="flex w-11/12 h-1/5 bg-white items-center">
          <Pressable
            className="flex w-11/12 h-1/3 justify-center items-center rounded-lg bg-primary-green shadow-lg shadow-black/100"
            onPress={() => navigation.navigate('Main')}>
            <Text className="font-inter text-lg text-white">시작하기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default StartScreen;
