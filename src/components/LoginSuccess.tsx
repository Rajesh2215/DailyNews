import {View, Text} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CheckCircle from '../assets/check-circle';
import styles from '../styles/styles';

const SucessPassword = (props:any) => {
  return (
    <View style={styles.customToastContainer}>
      <View style={{marginHorizontal: wp(4)}}>
        <CheckCircle />
      </View>
      <Text style={styles.customToastText}>
        {props.text}
      </Text>
    </View>
  );
};

export default SucessPassword;