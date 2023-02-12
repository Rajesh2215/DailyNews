import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import { NativeScreenNavigationContainer } from "react-native-screens";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";

export const navigationRef = React.createRef();

export type RootStackParamList ={
    HomeScreen:any;
    SearchScreen:any
    ProfileScreen:any
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

            </stack.Navigator>
        </NavigationContainer>
    )
}