import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import General from '../screens/NavBar/General';
import World from '../screens/NavBar/World';
import Business from '../screens/NavBar/Business';
import Entertainment from '../screens/NavBar/Entertainment';
import Sports from '../screens/NavBar/Sports';
import Health from '../screens/NavBar/Health';
import Science from '../screens/NavBar/Science';
import Technology from '../screens/NavBar/Technology';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomHeader from './CustomHeader';

export type RootStackParamList = {
  CustomHeader:any
  General: any;
  Business: any;
  Entertainment: any;
  Sports: any;
  Health: any;
  Science: any;
  Technology: any;
  World: any;
};

const Tab = createMaterialTopTabNavigator<RootStackParamList>();
const NavBar = () => {
  return (
    <Tab.Navigator
      // screenOptions={{
      //   tabBarScrollEnabled: true,
      //   tabBarIndicatorStyle: {
      //     backgroundColor: '#30C0E9',
      //     height: 2,
      //   },
      //   tabBarStyle: {
      //     // width: 'auto', marginBottom: 0, marginRight: 10
      //     // borderRadius: wp(5),
      //     // width: wp(90),
      //     // alignSelf: 'center',
      //     // justifyContent: 'flex-start', // Change this to 'flex-start'
      //     // marginHorizontal: wp(-5),
      //     // paddingLeft: wp(-10), // Add padding to the left to adjust for the border radius
      //     // paddingRight: wp(-10),
      //   },
      // }}
      screenOptions={({ route }) => ({
        header: () => <CustomHeader />,
        // tabBarLabel: ({ focused, color, size }) => {
        //   // You can customize the tab label here
        //   // For example, you can change the label color of the focused tab
        //   return <Text style={{ color: focused ? 'red' : 'black' }}>{route.name}</Text>;
        // },
      })}
      tabBarOptions={{
        tabStyle: {width: 'auto', marginBottom: 0, marginRight: 10},
        style: {backgroundColor: '#ffffff'},
        scrollEnabled: true,
        pressColor: 'transparent',
        pressOpacity: 0,
      }}
      sceneContainerStyle={{backgroundColor: 'white'}}>
      <Tab.Screen name={'General'} component={General} />
      <Tab.Screen name={'Business'} component={Business} />
      <Tab.Screen name={'Entertainment'} component={Entertainment} />
      <Tab.Screen name={'Sports'} component={Sports} />
      <Tab.Screen name={'Health'} component={Health} />
      <Tab.Screen name={'Science'} component={Science} />
      <Tab.Screen name={'Technology'} component={Technology} />
      {/* <Tab.Screen name={'World'} component={World} /> */}
    </Tab.Navigator>
  );
};

export default NavBar;
