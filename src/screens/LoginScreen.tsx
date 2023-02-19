import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {RootStackParamList} from '../../routes/routes';
import {NavigationContainer} from '@react-navigation/native';
import BottomBar from '../components/BottomBar';
import Button from '../components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {login} from '../services/appservices';
import LoginSuccess from '../components/LoginSuccess';

interface FormValues {
  email: string;
  password: string;
}
const LoginScreen = (props: any) => {
  const [error, setError] = useState('');
  const [isShow, setIsShow] = useState(false);
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values: FormValues) => {
    console.log('Login ');
    let req = {
      email: values.email,
      password: values.password,
    };
    const resp = await login(req);
    console.log('resp', resp.data);
    if (resp?.data?.response?.error) {
      setError(resp?.data?.response?.message);
      return resp
    }
    setIsShow(true);
    props.navigation.navigate('HomeScreen')
  };

  return (
    <>
      {isShow && <LoginSuccess text={'User Loggged In Succesffuly'} />}

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: wp(7), color: 'black', marginTop: hp(5)}}>
          Welcome Back
        </Text>
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <>
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
              <Text>Password</Text>
              <TextInput
                onChangeText={handleChange('password')}
                // onBlur={handleBlur('email')}
                value={values.password}
                style={styles.textInputStyle}
              />
              <View style={styles.lineStyle} />
            </View>

            <Text style={styles.errorText}>
              {errors.email
                ? errors.email
                : errors.password
                ? errors.password
                : ''}
            </Text>
            {error != '' && <Text style={styles.errorText}>{error}</Text>}
            <View style={{marginTop: hp(2)}}>
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
      <BottomBar active={'HomeScreen'} navigation={props.navigation} />
    </>
  );
};
export default LoginScreen;
