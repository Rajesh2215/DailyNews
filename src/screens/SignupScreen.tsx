import {
  View,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// import Formik, { handleTextInput,withNextInputAutoFocusInput, withNextInputAutoFocusForm } from 'react-native-formik';
import {Formik} from 'formik';
import styles from '../styles/styles';
import Eye from '../../assets/svg/Eye';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import {register} from '../services/appservices';
import * as Yup from 'yup';
import {compose} from 'recompose';
import {TextField} from 'react-native-material-textfield';
import LoginSuccess from '../components/LoginSuccess';
interface FormValues {
  username: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  password: string;
  confirmpass: string;
}

const SignupScreen = (props: any) => {
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const [confirmpass, setConfirmpass] = useState('');
  const [showconfpass, setShowconfpass] = useState(false);
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  // const [gender, setGender] = useState('');
  // const [age, setAge] = useState('');
  const [error, setError] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const initialValues: FormValues = {
    username: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    password: '',
    confirmpass: '',
  };

  const validationSchema = Yup.object().shape({
    username:Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone:Yup.string().required('Phone number is required'),
    age: Yup.number()
      .min(10, 'Age mjuust be greater than 10')
      .required('Age is required '),
    gender : Yup.string().required('Gender is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmpass: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
    
  });

  // const handleSubmit = (values: FormValues) => {
  //   console.log('values', values);
  // };

  const handleSubmit = async (values: FormValues) => {
    console.log('handlre');
    if (parseInt(values.age) < 10) {
      console.log('age', values.age);
      setError(true);
      return;
    }
    if (values.password != values.confirmpass) {
      console.log('password does not matched');
      setError(true);
      return;
    }
    setError(false);
    console.log('Submitting data');
    let req = {
      name: values.username,
      email: values.email,
      phone: values.phone,
      gender: values.gender,
      age: values.age,
      password: values.password,
    };
    const resp = await register(req);
    setIsShow(true);
    console.log('resp', resp.data);
    props.navigation.navigate('LoginScreen')
  };

  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, 3000);
  }, [isShow]);

  // const navigation = useNavigation()
  return (
    <>
      <StatusBar backgroundColor="#30C0E9" barStyle="dark-content" />
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <SafeAreaView style={{flex: 1}}>
          {isShow && <LoginSuccess text={'User Registerd Succesffuly'} />}
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: wp(7), color: 'black', marginTop: hp(5)}}>
              DailyNews
            </Text>
          </View>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.formInput}>
                  <Text>Username</Text>

                  <TextInput
                    onChangeText={handleChange('username')}
                    // onBlur={handleBlur('email')}
                    value={values.username}
                    style={styles.textInputStyle}
                  />
                  <View style={styles.lineStyle} />
                </View>

                <View style={styles.formInput}>
                  <Text>Email</Text>
                  <TextInput
                    onChangeText={handleChange('email')}
                    // onBlur={handleBlur('email')}
                    value={values.email}
                    style={styles.textInputStyle}
                  />
                  <View style={styles.lineStyle} />
                </View>

                <View style={styles.formInput}>
                  <Text>Phone</Text>
                  <TextInput
                    onChangeText={handleChange('phone')}
                    // onBlur={handleBlur('email')}
                    value={values.phone}
                    style={styles.textInputStyle}
                  />
                  <View style={styles.lineStyle} />
                </View>

                <View style={styles.formInput}>
                  <Text>Age</Text>
                  <TextInput
                    onChangeText={handleChange('age')}
                    // onBlur={handleBlur('email')}
                    value={values.age}
                    style={styles.textInputStyle}
                  />
                  <View style={styles.lineStyle} />
                </View>

                <View style={styles.formInput}>
                  <Text>Gender</Text>
                  <TextInput
                    onChangeText={handleChange('gender')}
                    // onBlur={handleBlur('email')}
                    value={values.gender}
                    style={styles.textInputStyle}
                  />
                  <View style={styles.lineStyle} />
                </View>
                {/* {errors.email && touched.email && <Text>{errors.email}</Text>} */}
                <View style={styles.formInput}>
                  <Text>Password</Text>
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      secureTextEntry={!showPassword}
                      onChangeText={handleChange('password')}
                      // onBlur={handleBlur('password')}
                      value={values.password}
                      style={[styles.textInputStyle, {width: wp(75)}]}
                    />
                    <TouchableOpacity
                      // style={{justifyContent:'flex-end'}}
                      onPress={() => {
                        setShowPassword(!showPassword);
                      }}>
                      <View
                        style={{
                          alignSelf: 'flex-end',
                          marginTop: hp(1),
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          alignContent: 'flex-end',
                        }}>
                        <Eye height={wp(5)} width={wp(5)}></Eye>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.lineStyle} />
                </View>

                <View style={styles.formInput}>
                  <Text>Confirm Password</Text>
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      secureTextEntry={!showconfpass}
                      onChangeText={handleChange('confirmpass')}
                      onBlur={handleBlur('confirmpass')}
                      value={values.confirmpass}
                      style={[styles.textInputStyle, {width: wp(75)}]}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setShowconfpass(!showconfpass);
                      }}>
                      <View style={{marginTop: hp(1)}}>
                        <Eye height={wp(5)} width={wp(5)}></Eye>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.lineStyle} />
                </View>
                {errors && (
                  //  <View style={styles.errorText}>
                  <>
                  {errors.password != errors.confirmpass && (
                      <Text style={styles.errorText}>
                        Password Does not matched
                      </Text>
                    )}
                    {/* //  <View style={styles.errorText}> */}
                    <Text style={styles.errorText}>
                      {errors.email
                        ? errors.email
                        : errors.age
                        ? errors.age
                        : errors.password
                        ? errors.password
                        : ''}
                    </Text>
                    
                  </>
                )}
                {/* // </View>} */}
                <View>
                  <Button
                    title="Submit"
                    action={() => {
                      handleSubmit();
                    }}
                  />
                </View>
              </>
            )}
          </Formik>
          {/* <View style={{alignSelf: 'center'}}>
            <View style={styles.formInput}>
              <Text>Username</Text>
              <TextInput value={username} onChangeText={(val)=>{
                setUsername(val)
              }} style={styles.textInputStyle} />
              <View style={styles.lineStyle} />
            </View>
            <View style={styles.formInput}>
              <Text>Email</Text>
              <TextInput value={email} onChangeText={(val)=>{
                setEmail(val)
              }} style={styles.textInputStyle} />
              <View style={styles.lineStyle} />
            </View>
            <View style={styles.formInput}>
              <Text>Phone</Text>
              <TextInput
              value={phone}
              onChangeText={(val)=>{
                setPhone(val)
              }}
                keyboardType="number-pad"
                style={styles.textInputStyle}
              />
              <View style={styles.lineStyle} />
            </View>

            <View style={styles.formInput}>
              <Text>Gender</Text>
              <TextInput value={gender} onChangeText={(val)=>{
                setGender(val)
              }} style={styles.textInputStyle} />
              <View style={styles.lineStyle} />
            </View>

            <View style={styles.formInput}>
              <Text>Age</Text>
              <TextInput value={age} onChangeText={(val)=>{
                setAge(val)
              }} style={styles.textInputStyle} />
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
                    setPassword(val);
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}>
                  <View style={{marginTop: hp(1)}}>
                    <Eye height={wp(5)} width={wp(5)}></Eye>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lineStyle} />

            <View style={styles.formInput}>
              <Text>Confirm Password</Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={[styles.textInputStyle, {width: wp(75)}]}
                  secureTextEntry={!showconfpass}
                  value={confirmpass}
                  onChangeText={val => {
                    setConfirmpass(val);
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setShowconfpass(!showconfpass);
                  }}>
                  <View style={{marginTop: hp(1)}}>
                    <Eye height={wp(5)} width={wp(5)}></Eye>
                  </View>
                </TouchableOpacity>
                
              </View>
              
            </View>
            <View style={styles.lineStyle} />

            {error && (
              <Text style={styles.errorText}>{parseInt(age) < 10 ? 'Age should be greater than 10':password != confirmpass ?'Please check ur password'!:'Something went wrong!'}</Text>
            )
            }


            <View style={{marginTop: hp(5)}}>
              <Button 
              text='SignUp'
              action={()=>{
                submit()
              }} />
            </View>
              <View style={{flexDirection:'row', marginTop: hp(2),alignSelf: 'center'}}>
            <Text>
              Already have an account?
            </Text>
            <View>
            <Text style={{marginHorizontal:wp(3),textDecorationLine:'underline',color:'#3a7bd5'}} onPress={()=>{props.navigation.navigate('HomeScreen')}} >LogIn</Text>
            </View>
            </View>
          </View> */}
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default SignupScreen;
