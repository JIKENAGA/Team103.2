import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

function ResetPasswordScreen(props) {
    const onPressLogin = () => {
        props.navigation.navigate('LoginScreen');
      };
    return(
        <View style = {styles.container}>
            <TouchableOpacity
            onPress={onPressLogin}>
                <Text> This is ResetPasswordScreen</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    }
})

export default ResetPasswordScreen;