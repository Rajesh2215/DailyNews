import {View, Text, StatusBar, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomBar from '../components/BottomBar';
import Button from '../components/Button';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/CustomHeader';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const ProfileScreen = (props: any) => {
  const [hideBottomBar, setHideBottomBar] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const dispatch = useDispatch();
  const handleTap = () => {
    setHideBottomBar(!hideBottomBar);
    setHideHeader(!hideHeader)
  };

  
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          handleTap();
        }}>
        <View style={{height: heightPercentageToDP(100)}}>
          {!hideHeader && <CustomHeader />}

          <View>
            <Text>ProfileScreen</Text>
          </View>
          <Button
            title={'Linking'}
            action={() => {
              dispatch(logout());
              props.navigation.navigate('SignupScreen');
            }}
          />
        </View>
      </TouchableOpacity>
      {!hideBottomBar && (
        <BottomBar active={'ProfileScreen'} navigation={props.navigation} />
      )}
    </>
  );
};

export default ProfileScreen;

