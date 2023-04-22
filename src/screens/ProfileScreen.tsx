import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomBar from '../components/BottomBar';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/CustomHeader';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import NavBar from '../components/Navbar';
// import styles from '../styles/styles';
import {TextInput} from 'react-native';
import ProfileInput from '../components/ProfileInput';
import moment from 'moment';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
const ProfileScreen = (props: any) => {
  const [hideBottomBar, setHideBottomBar] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const dispatch = useDispatch();
  const handleTap = () => {
    setHideBottomBar(!hideBottomBar);
    setHideHeader(!hideHeader);
  };
  const user = useSelector(state => state.myReducer);

  console.log('user.data', user.data.email);
  let value = user.data.email;
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  let createdAt = value.createdAt;
  const date = moment(createdAt);

  const formattedDate = date.format('Do MMMM YYYY');

  console.log('formattedDate', formattedDate);
  const [imageUri, setImageUri] = useState('https://placekitten.com/200/200');

  const handleChoosePhoto =async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const result = await launchImageLibrary(options)
    // ImagePicker.showImagePicker(options, response => {
    //   if (response.uri) {
    //     setImageUri(response.uri);
    //   }
    // });
  };

  return (
    <>
      <View style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SafeAreaView style={{flex: 1}}>
            <CustomHeader />
            {/* <View style={{
        width:wp(40),
        height:hp(20),
        borderColor:'#000000',
        borderWidth:wp(0.5),
        borderRadius:wp(25)
      }}></View> */}
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={handleChoosePhoto}>
                <Image source={{uri: imageUri}} style={styles.image} />
                <View style={styles.addIcon}>
                  <Text style={styles.addIconText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: hp(-10)}}>
              <ProfileInput text={'Email Address'} data={value.email} />
              <ProfileInput text={'Name'} data={value.name} />
              <ProfileInput text={'Gender'} data={value.gender} />
              <ProfileInput text={'Phone'} data={value.phone} />
            </View>
            <View style={{marginBottom:hp(20)}}>
              <ProfileInput text={'Created At'} data={formattedDate} />
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
      <BottomBar active={'ProfileScreen'} navigation={props.navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: hp(22),
    height: wp(40),
    borderRadius: 100,
  },
  addIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIconText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default ProfileScreen;
