import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import { NativeScreenNavigationContainer } from "react-native-screens";
import HomeScreen from "../src/screens/HomeScreen";
import SignupScreen from "../src/screens/SignupScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
import SearchScreen from "../src/screens/SearchScreen";
import LoginScreen from "../src/screens/LoginScreen";
export const navigationRef = React.createRef();

export type RootStackParamList ={
    HomeScreen:any;
    SearchScreen:any;
    ProfileScreen:any;
    SignupScreen:any;
    LoginScreen:any;
}


export const Routes=()=>{
    const stack = createStackNavigator<RootStackParamList>()
    return(
        <NavigationContainer>
            <stack.Navigator
            screenOptions={{
                headerShown:false
            }}
            >
                <stack.Screen name="HomeScreen" component={HomeScreen}/>
                <stack.Screen name="SearchScreen" component={SearchScreen}/>
                <stack.Screen name="ProfileScreen" component={ProfileScreen}/>
                <stack.Screen name="SignupScreen" component={SignupScreen}/>
                <stack.Screen name="LoginScreen" component={LoginScreen}/>


            </stack.Navigator>
        </NavigationContainer>
    )
}