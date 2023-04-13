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
import {Ionicons} from '@expo/vector-icons';
import "./EmailConfirmation"; 
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ResetPasswordScreen(props) {
  const [email, setEmail] = useState("");
  const onPressLogin = () => {
      props.navigation.navigate('LoginScreen');
    };
  const onPressSignin = () => {
      props.navigation.navigate('SigninScreen');
    };
  const auth = getAuth();

  const resetEmail = (email) => {
    console.log(email);
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent");
      alert("Email Sent")
    })
    .catch((error) => {
      console.log("Error sending password reset email: ", error);
      alert("Error sending email")
    });
  };  

  const onPressConfirmEmail = () => {
      resetEmail(email);
    };

  



      return (
        <View style={styles.container}>
          <Image style={styles.image} source={require("./assets/WacConnectLogo.jpg")} /> 
          <Text>RESET PASSWORD</Text>
          <StatusBar style="auto" />

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
          
          <TouchableOpacity 
            style={styles.sendCodeBtn}
            onPress={onPressConfirmEmail} >
            <Text
              title = "SendCode"
              >SEND CODE</Text> 
          </TouchableOpacity> 
          
          <TouchableOpacity
          style={styles.backLinks}
          onPress={onPressSignin} >
            <Text style={styles.signinBtn}>New here? SignIn</Text> 
          </TouchableOpacity> 
          <TouchableOpacity
          style={styles.backLinks}
          onPress={onPressLogin} >
            <Text style={styles.forgot_button}>Go back to LogIn?</Text> 
          </TouchableOpacity> 

        </View> 
      );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      image: {
        marginBottom: 50,
        width: 200,
        height: 114,
      },
      inputView: {
        backgroundColor: "#C6C8CA",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 5,
        marginTop: 30,
        flexDirection: 'row',
        paddingHorizontal: 12,
        alignItems: "center",
      },
      Button: {
    
      },

      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        
      },

      sendCodeBtn: {
        width: "30%",
        borderRadius: 15,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 50,
        backgroundColor: "#BBC0C4",
      },
      backLinks:{
        marginBottom: 5,
        alignContent: "bottom",
      }

    });
export default ResetPasswordScreen;