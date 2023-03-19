import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {register, Verify, verifyOtp} from '../services/appservices';
import BottomBar from '../components/BottomBar';
import CustomHeader from '../components/CustomHeader';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../components/Button';
import MaskedInput from '../components/MaskedInput';
import {LOGIN_SUCCESS} from '../../redux/action';
import {useDispatch} from 'react-redux';
const VerificationScreen = (props: any) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [errorValue, setErrorValue] = useState('');
  const dispatch = useDispatch();
  let propsData = props.route.params;
  const verification = async (code, propsData) => {
    console.log('Verification hitting')
    const finalValue = await verifyOtp(code, props.route.params);
    console.log('finalValue', finalValue.status)
    if (finalValue.status == 400) {
      setErrorValue('Invalid Code.Please try again');
      return 
    } else {
      const resp = await register(propsData);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          isAuthenticated: true,
          user: resp.data.access_token,
          data:propsData
        },
      });
      props.navigation.navigate('HomeScreen');
    }
  };

  const setUserCode = data => {
    if (error && data.length === 6) {
      setError(false);
    }
    setCode(data);
  };

  return (
    <>
      <View style={{height: hp(100), marginTop: hp(10)}}>
        {/* <CustomHeader /> */}
        <Text
          style={{
            fontSize: hp(4),
            textAlign: 'center',
            fontWeight: '600',
            color: 'black',
          }}>
          Verfication Screen
        </Text>
        <View style={styles.innerView}>
          <View style={styles.cardView}>
            <MaskedInput
              // editable={code?.length < 6}
              title="CODE"
              mask={6}
              data={code}
              setData={setUserCode}
              error={error}
            />
            <Text style={{marginTop: hp(2), alignSelf: 'center', color: 'red'}}>
              {errorValue}
            </Text>
            <Button
              title={'Linking'}
              action={async () => {
                console.log('working');
                await verification(code, propsData);
              }}
            />
          </View>
        </View>
      </View>
      <View style={{marginTop: hp(30)}}></View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    //   flex: 1,
    //   marginLeft: wp(6),
    //   marginRight: wp(2),
  },
  innerView: {
    width: '100%',
    height: '100%',
  },
  topText: {
    fontFamily: 'Sofia Pro',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: wp(7),
    color: '#000000',
    letterSpacing: wp(0.2),
    fontWeight: 'bold',
    paddingVertical: hp(3),
  },
  cardView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 24,
    width: wp(88),
    padding: wp(6),
    marginBottom: hp(1),
    elevation: 1,
    marginHorizontal: wp(6),
    marginTop: hp(5),
  },
});
export default VerificationScreen;
