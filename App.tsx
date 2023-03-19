/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  Button,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import {useEffect} from 'react';
import {Routes} from './routes/routes';
import SignupScreen from './src/screens/SignupScreen';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
// import CustomHeader from './src/components/CustomHeader';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const fetchApi = async () => {
    try {
      const res = await axios.get('http://192.168.152.244:5500');
      console.log('Response ', res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApi();
    request_location_runtime_permission()
  }, []);
  return (
    <>
      {/* <StatusBar backgroundColor="#30C0E9" barStyle="dark-content" /> */}
      <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
      </PersistGate>
      </Provider>
    </>
    // <BottomBar />
    // <Text>Jai Shri Ram</Text>
  );
}
export default App;

export async function request_location_runtime_permission() {
 
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      // {
      //   'title': 'ReactNativeCode Location Permission',
      //   'message': 'ReactNativeCode App needs access to your location '
      // }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
 
      Alert.alert("Location Permission Granted.");
    }
    else {
 
      Alert.alert("Location Permission Not Granted");
 
    }
  } catch (err) {
    console.warn(err)
  }
}
