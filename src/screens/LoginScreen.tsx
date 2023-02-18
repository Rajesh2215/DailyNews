import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/routes';
import {NavigationContainer} from '@react-navigation/native';
import BottomBar from '../components/BottomBar';
import Button from '../components/Button';

type props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen: React.FC<props> = props => {
  return (
    <>
      <View>
        <Text>This is Login Screen</Text>
      </View>
      <Button
        title={'Linking'}
        action={() => {
          console.log('working');
          props.navigation.navigate('HomeScreen');
        }}
      />
      <BottomBar active={'HomeScreen'} navigation={props.navigation} />
    </>
  );
};
export default LoginScreen;
