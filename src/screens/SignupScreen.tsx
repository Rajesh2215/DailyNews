import {
  View,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/styles';
import Eye from '../../assets/svg/Eye';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import BottomBar from '../components/BottomBar';
const SignupScreen = (props: any) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const navigation = useNavigation()
  return (
    <>
      <StatusBar backgroundColor="#30C0E9" barStyle="dark-content" />
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: wp(7), color: 'black', marginTop: hp(5)}}>
              DailyNews
            </Text>
          </View>

          <View style={{alignSelf: 'center'}}>
            <View style={styles.formInput}>
              <Text>Username</Text>
              <TextInput style={styles.textInputStyle} />
              <View style={styles.lineStyle} />
            </View>
            <View style={styles.formInput}>
              <Text>Email</Text>
              <TextInput style={styles.textInputStyle} />
              <View style={styles.lineStyle} />
            </View>
            <View style={styles.formInput}>
              <Text>Phone</Text>
              <TextInput
                keyboardType="number-pad"
                style={styles.textInputStyle}
              />
              <View style={styles.lineStyle} />
            </View>

            <View style={styles.formInput}>
              <Text>Password</Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={[styles.textInputStyle, {width: wp(75)}]}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={val => {
                    console.log('value is changeing')
                    setPassword(val);
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    console.log('checkl');
                    setShowPassword(!showPassword);
                  }}>
                  <View style={{marginTop: hp(1)}}>
                    <Eye height={wp(5)} width={wp(5)}></Eye>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lineStyle} />
            <View style={{marginTop: hp(5)}}>
              <Button 
              text='SignUp'
              action={()=>{
                console.log('Button is fine')
                props.navigation.navigate('LoginScreen')
              }} />
            </View>
              <View style={{flexDirection:'row', marginTop: hp(2),alignSelf: 'center'}}>
            <Text>
              Already have an account?
            </Text>
            {/* <TouchableOpacity> */}
            <View>
            <Text style={{marginHorizontal:wp(3),textDecorationLine:'underline',color:'#3a7bd5'}} onPress={()=>{props.navigation.navigate('HomeScreen')}} >LogIn</Text>
            </View>
            {/* </TouchableOpacity> */}
            </View>
          </View>
          
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default SignupScreen;
