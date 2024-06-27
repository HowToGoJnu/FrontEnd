import React from 'react';
import {View, Button} from 'react-native';
import {RootStackParamList} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type StartScreenProps = NativeStackScreenProps<RootStackParamList, 'Start'>;

function StartScreen({navigation}: StartScreenProps) {
  return (
    <View>
      <Button title="메인페이지" onPress={() => navigation.navigate('Main')} />
    </View>
  );
}

export default StartScreen;
