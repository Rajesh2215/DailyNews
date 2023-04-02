import React, {useEffect} from 'react';
import BottomBar from '../components/BottomBar';
import CustomHeader from '../components/CustomHeader';
import {NavRoutes} from '../../routes/navRoutes';
import NavBar from '../components/Navbar';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const HomeScreen = (props: any) => {
  return (
    <>
      {/* <View style={{backgroundColor:'#ffffff'}}> */}
        <CustomHeader />
      {/* </View> */}
      <NavBar />
      <BottomBar active={'HomeScreen'} navigation={props.navigation} />
    </>
  );
};

export default HomeScreen;
