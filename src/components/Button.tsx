import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient-1';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Button = (props: any) => {
  return (
    <TouchableOpacity onPress={props.action}>
      <LinearGradient
        style={{
          width: wp(30),
          height: hp(5),
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          borderRadius: 26,
          // marginTop: hp(5),
        }}
        colors={['#00d2ff', '#3a7bd5']}>
        <Text>{props.text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default Button;
