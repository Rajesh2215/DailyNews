import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SidebarIcon from '../assets/SidebarIcon';
import LocationIcon from '../assets/LocationIcon';
import Bell from '../assets/Bell';
import ProfileIcon from '../../assets/svg/Profile';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HomeIcon from '../../assets/svg/HomeIcon';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/action';
import Delete from '../../assets/svg/Delete';
import {DeleteUser} from '../services/appservices';
import StarIcon from '../../assets/svg/star';
const CustomHeader = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const user = useSelector(state => state.myReducer);
  console.log('user', user.data.email);
  useEffect(() => {
    if (!isFocused) {
      setIsOpen(false);
    }
  }, [isFocused]);

  return (
    <>
      <View style={{width: wp(100), margin: wp(5), flexDirection: 'row'}}>
        <TouchableOpacity>
          <SidebarIcon
            onPress={() => {
              if (!isOpen) {
                setIsOpen(true);
              } else {
                setIsOpen(false);
              }
            }}
          />
        </TouchableOpacity>
        <View style={{margin: wp(2)}}>
          <LocationIcon />
        </View>
        <Text style={{margin: wp(2)}}>Mumbai,India</Text>
        <View
          style={{
            justifyContent: 'flex-end',
            width: wp(45),
            margin: wp(2),
            marginTop: hp(-2),
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity>
            <StarIcon
              onPress={() => {
                navigation.navigate('SavedScreen');
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isOpen && (
        <View
          style={[
            styles.sidebarContainer,
            isOpen ? styles.open : styles.closed,
          ]}>
          <Text
            onPress={() => {
              setIsOpen(false);
            }}
            style={styles.closeButton}>
            Close
          </Text>
          {/* Add your sidebar content here */}
          <View style={{flexDirection: 'row'}}>
            <HomeIcon />
            <Text
              style={{marginLeft: wp(2), color: 'black'}}
              onPress={() => {
                setIsOpen(false);
                navigation.navigate('HomeScreen');
              }}>
              HomeScreen
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: hp(3)}}>
            <ProfileIcon />
            <Text
              style={{marginLeft: wp(2), color: 'black'}}
              onPress={() => {
                setIsOpen(false);
                navigation.navigate('ProfileScreen');
              }}>
              ProfileScreen
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: hp(3)}}>
            <ProfileIcon />
            <Text
              style={{marginLeft: wp(2), color: 'black'}}
              onPress={() => {
                setIsOpen(false);
                navigation.navigate('SearchScreen');
              }}>
              SearchScreen
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: hp(3)}}>
            <ProfileIcon />
            <Text
              style={{marginLeft: wp(2), color: 'black'}}
              onPress={() => {
                dispatch(logout());
              }}>
              Logout
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: hp(3)}}>
            <Delete />
            <Text
              style={{marginLeft: wp(2), color: 'black'}}
              onPress={async () => {
                console.log('user.data.email', user.data.email);
                await DeleteUser(user.data.email);
                dispatch(logout());
                props.navigation.navigate('SignupScreen');
              }}>
              Delete Account
            </Text>
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    // marginTop:hp(10),
    height: hp(100),
    width: wp(70),
    backgroundColor: '#84bcdf',
    zIndex: 999,
    paddingHorizontal: 20,
    paddingTop: 40,
    // borderRadius:wp(10)
    borderTopEndRadius: wp(10),
  },
  open: {
    transform: [{translateX: 0}],
  },
  closed: {
    transform: [{translateX: -1000}],
  },
  closeButton: {
    marginBottom: 20,
  },
});
export default CustomHeader;
