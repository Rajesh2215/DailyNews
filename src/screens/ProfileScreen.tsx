import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomBar from '../components/BottomBar';
import Button from '../components/Button';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/CustomHeader';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import NavBar from '../components/Navbar';

const ProfileScreen = (props: any) => {
  const [hideBottomBar, setHideBottomBar] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const dispatch = useDispatch();
  const handleTap = () => {
    setHideBottomBar(!hideBottomBar);
    setHideHeader(!hideHeader);
  };

  return (
    <>
      <CustomHeader /> 
      <NavBar />

      <BottomBar active={'ProfileScreen'} navigation={props.navigation} />
    </>
  );
};

export default ProfileScreen;
