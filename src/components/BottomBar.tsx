import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import HomeIcon from '../../assets/svg/HomeIcon';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileIcon from '../../assets/svg/Profile';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Device from 'react-native-device-detection';
import Selected from '../../assets/svg/selected';

const BottomBar = (props: any) => {
  const height = wp(5.5);
  const buttonData = [
    {icon: <HomeIcon height={height} />, route: 'HomeScreen'},
    {
      icon: <HomeIcon height={height} />,
      route: 'SearchScreen',
    },

    {
      icon: <ProfileIcon height={height} />,
      route: 'ProfileScreen',
    },
  ];
  return (
    <View style={Device.isTablet ? styles.tabBar : styles.bar}>
      {buttonData.map((data: { route: any; icon: any; }, index: React.Key | null | undefined) => {
        return (
          <TouchableOpacity
            key={index}
            style={Device.isTablet ? styles.tabButtonArea : styles.buttonArea}
            onPress={() => {
              if (data.route !== props.active) {
                props.navigation.navigate(data.route);
              }
            }}>
            <>
              {data.icon}
              {data.route === props.active && (
                <Selected
                  style={Device.isTablet ? styles.tabSelected : styles.selected}
                />
              )}
            </>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  selected: {
    height: hp(0.8),
    width: hp(0.8),
    paddingTop: hp(2.3),
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    bottom: '1%',
    marginBottom:hp(-1),
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.04)',
    height: wp(15),
    width: wp(100),
    // borderRadius: 30,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    bottom: '1%',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: '#282828',
    height: wp(12),
    width: '95%',
    borderRadius: 30,
  },
  tabButtonArea: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '3%',
  },
  tabSelected: {
    height: hp(0.8),
    width: hp(0.8),
    paddingTop: hp(1),
  },
  buttonArea: {
    height: '95%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '8%',
  },
});
