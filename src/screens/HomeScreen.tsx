import {View, Text} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import BottomBar from '../components/BottomBar';

const HomeScreen = (props: any,navigation: any) => {
  return (
    <>
      <View>
        <Text>HomeScreen</Text>
      </View>
      <Button
        title={'Linking'}
        action={() => {
          props.navigation.navigate('LoginScreen');
        }}
      />
      <BottomBar active={'HomeScreen'} navigation={props.navigation} />
    </>
  );
};

export default HomeScreen;
