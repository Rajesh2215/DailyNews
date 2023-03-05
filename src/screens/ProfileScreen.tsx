import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
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
    console.log('Handling Tap');
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
              console.log('working');
              // dispatch(logout());
              // props.navigation.navigate('SignupScreen');
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
