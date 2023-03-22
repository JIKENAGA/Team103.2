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
import {FontAntDesign, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';

function SigninScreen(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const onPressLogin = () => {
        props.navigation.navigate('LoginScreen');
      };


    return(
      <View style={styles.container}>
  
      <Image style={styles.image} source={require("./assets/WacConnectLogo.jpg")} /> 

      <View style={styles.inputView}>
        <View style={[styles.iconContainer]}>
          <Ionicons name="person-circle" size={25} color="black" />
        </View>
        <TextInput
          style={styles.TextInput}
          placeholder="First Name"
          placeholderTextColor="black"
          onChangeText={(firstName) => setFirstName(firstName)}
        /> 
      </View> 

      <View style={styles.inputView}>
        <View style={[styles.iconContainer]}>
          <Ionicons name="person-circle" size={25} color="black" />
        </View>
        <TextInput
          style={styles.TextInput}
          placeholder="Last Name"
          placeholderTextColor="black"
          onChangeText={(lastName) => setLastName(lastName)}
        /> 
      </View> 

      <View style={styles.inputView}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-circle" size={25} color="black" />
        </View>
        <TextInput
          style={styles.TextInput}
          placeholder="Display Name"
          placeholderTextColor="black"
          onChangeText={(displayName) => setDisplayName(displayName)}
        /> 
      </View> 

      <View style={styles.inputView}>
        <View style={[styles.iconContainer]}>
          <Ionicons name="mail" size={25} color="black" />
        </View>
        <TextInput
          style={styles.TextInput}
          placeholder="School Email"
          placeholderTextColor="black"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 

      <View style={styles.inputView}>
        <View style={[styles.iconContainer]}>
          <Ionicons name="key" size={25} color="black" />
        </View>
        <TextInput
          style={styles.TextInput}
          placeholder="Create Password"
          placeholderTextColor="black"
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 

      <View style={styles.inputView}>
        <View style={[styles.iconContainer]}>
          <Ionicons name="key" size={25} color="black" />
        </View>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="black"
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        /> 
      </View> 

        <View style = {styles.returnToLogin}>
            <TouchableOpacity
            onPress={onPressLogin}>
                <Text> Already have an account?</Text>
             
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

    image: {
      marginBottom: 40,
      width: 200,
      height: 114,
    },

    inputView: {
      backgroundColor: "#C6C8CA",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 10,
    },

    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
    },
    
    returnToLogin: {
      height: 30,
      color: '#005990',
    }
})

export default SigninScreen;