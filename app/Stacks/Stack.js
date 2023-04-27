import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from "../LoginScreen";
import HomeScreen from "../HomeScreen"
import SigninScreen from "../SigninScreen"
import ResetPasswordScreen from "../ResetPasswordScreen"
import EmailConfirmation from "../EmailConfirmation"
import ProfileScreen from "../ProfileScreen"
import SearchClassScreen from "../SearchClassScreen"
import GroupScreen from "../GroupScreen"
import CreateGroup from "../CreateGroup"
import MyGroupScreen from "../MyGroupScreen"
import ChatScreen from "../Chat";

export default Stack = () => {
    const AppStack = createStackNavigator();

    return(
        <AppStack.Navigator screenOptions={{headerShown: false}}>
            <AppStack.Screen name = "LoginScreen" component = {LoginScreen}/>
            <AppStack.Screen name = "HomeScreen" component = {HomeScreen}/>
            <AppStack.Screen name = "SigninScreen" component = {SigninScreen}/>
            <AppStack.Screen name = "ResetPasswordScreen" component = {ResetPasswordScreen}/>
            <AppStack.Screen name = "EmailConfirmation" component = {EmailConfirmation}/>
            <AppStack.Screen name = "ProfileScreen" component = {ProfileScreen}/>
            <AppStack.Screen name = "SearchClassScreen" component = {SearchClassScreen}/>
            <AppStack.Screen name = "GroupScreen" component= {GroupScreen}/> 
            <AppStack.Screen name = "CreateGroup" component = {CreateGroup}/>
            <AppStack.Screen name = "MyGroupScreen" component = {MyGroupScreen}/>
            <AppStack.Screen name = "ChatScreen" component = {ChatScreen}/>
        </AppStack.Navigator>
    )
}

