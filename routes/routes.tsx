import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import {NativeScreenNavigationContainer} from 'react-native-screens';
import HomeScreen from '../src/screens/HomeScreen';
import SignupScreen from '../src/screens/SignupScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import SearchScreen from '../src/screens/SearchScreen';
import LoginScreen from '../src/screens/LoginScreen';
import {useSelector} from 'react-redux';
import CustomHeader from '../src/components/CustomHeader';
import VerificationScreen from '../src/screens/VerificationScreen';
import SavedScreen from '../src/screens/SavedScreen';
export const navigationRef = React.createRef();

export type RootStackParamList = {
  HomeScreen: {apiCall: boolean};
  SearchScreen: any;
  ProfileScreen: any;
  SignupScreen: any;
  LoginScreen: any;
  CustomHeader: any;
  VerificationScreen: any;
  SavedScreen: any;
};

export const Routes = () => {
  const user = useSelector(state => state.myReducer);
  const stack = createStackNavigator<RootStackParamList>();
  const linking: LinkingOptions = {
    prefixes: ['dailynews://'],
    config: {
      screens: {
        HomeScreen: 'HomeScreen',
        // SearchScreen: 'SearchScreen',
      },
    },
  };
  return (
    <NavigationContainer linking={linking}>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user.isAuthenticated && (
          <>
            <stack.Screen name="HomeScreen" component={HomeScreen} />
            <stack.Screen name="SearchScreen" component={SearchScreen} />
            <stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <stack.Screen name="SavedScreen" component={SavedScreen} />
            <stack.Screen
              name="CustomHeader"
              component={CustomHeader}
              options={({navigation}) => ({
                header: () => <CustomHeader navigation={navigation} />,
              })}
            />
          </>
        )}
        <stack.Screen name="LoginScreen" component={LoginScreen} />
        <stack.Screen name="SignupScreen" component={SignupScreen} />
        <stack.Screen
          name="VerificationScreen"
          component={VerificationScreen}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};
