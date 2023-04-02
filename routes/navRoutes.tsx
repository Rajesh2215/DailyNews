import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {NativeScreenNavigationContainer} from 'react-native-screens';
import General from '../src/screens/NavBar/General';
import World from '../src/screens/NavBar/World';


export const navigationRef = React.createRef();

export type RootStackParamList = {
  General: any;
  World:any
  
};

export const NavRoutes = () => {
  const stack = createStackNavigator<RootStackParamList>();
  const linking: LinkingOptions = {
    prefixes: ['dailynews://'],
    config: {
      screens: {
        // G: 'HomeScreen',
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
          <>
            <stack.Screen name="General" component={General} />
            <stack.Screen name="World" component={World} />
            
            {/* <stack.Screen
              name="CustomHeader"
              component={CustomHeader}
              options={({navigation}) => ({
                header: () => <CustomHeader navigation={navigation} />,
              })}
            /> */}
          </>
        
      </stack.Navigator>
    </NavigationContainer>
  );
};

// general, world, nation, business, technology, entertainment, sports, science and health.