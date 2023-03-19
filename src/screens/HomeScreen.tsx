import {View, Text, Alert} from 'react-native';
import React, {useEffect} from 'react';
import Button from '../components/Button';
import BottomBar from '../components/BottomBar';
import Geolocation from '@react-native-community/geolocation';
import CustomHeader from '../components/CustomHeader';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CData} from '../services/appservices';
import {CDATA} from '../../redux/action';
import { heightPercentageToDP } from 'react-native-responsive-screen';
const HomeScreen = (props: any) => {
  // useEffect(() => {
  //   console.log('inside usefect')
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       // setUserLocation(position);
  //       console.log('position', position)
  //     },
  //     (error) => Alert.alert('Error', JSON.stringify(error)),
  //       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  //     );
  // },)

  return (
    <>
      <CustomHeader />
      <Text style={{marginTop:heightPercentageToDP(10)}}>This is home</Text>
      <BottomBar active={'HomeScreen'} navigation={props.navigation} />
    </>
  );
};

export default HomeScreen;
