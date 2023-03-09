import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from "../LoginScreen";

export default Stack = () => {
    const AppStack = createStackNavigator();

    return(
        <AppStack.Navigator screenOptions={{headerShown: false}}>
            <AppStack.Screen name = "LoginScreen" component = {LoginScreen}/>
        </AppStack.Navigator>
    )
}

