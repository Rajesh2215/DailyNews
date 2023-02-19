import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SidebarIcon from '../assets/SidebarIcon';
import LocationIcon from '../assets/LocationIcon';
import Bell from '../assets/Bell';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CustomHeader = (props: any) => {
  return (
    <>
      <View style={{width: wp(100), margin: wp(5), flexDirection: 'row'}}>
        <SidebarIcon />
        <View style={{margin: wp(2)}}>
          <LocationIcon />
        </View>
        <Text style={{margin:wp(2)}}>Location</Text>
        <View
          style={{
            justifyContent: 'flex-end',
            width: wp(55),
            margin: wp(2),
            alignItems: 'flex-end',
          }}>
          <Bell />
        </View>
      </View>
    </>
  );
};

export default CustomHeader;
