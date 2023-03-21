import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from "../LoginScreen";
import HomeScreen from "../HomeScreen"
import SigninScreen from "../SigninScreen"
import ResetPasswordScreen from "../ResetPasswordScreen"

export default Stack = () => {
    const AppStack = createStackNavigator();

    return(
        <AppStack.Navigator screenOptions={{headerShown: false}}>
            <AppStack.Screen name = "LoginScreen" component = {LoginScreen}/>
            <AppStack.Screen name = "HomeScreen" component = {HomeScreen}/>
            <AppStack.Screen name = "SigninScreen" component = {SigninScreen}/>
            <AppStack.Screen name = "ResetPasswordScreen" component = {ResetPasswordScreen}/>
        </AppStack.Navigator>
    )
}

