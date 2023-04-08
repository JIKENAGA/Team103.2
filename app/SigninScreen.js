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
  KeyboardAvoidingView,
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {ref, set, push, child, onValue} from "firebase/database";
import { db } from './Firebase/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function SigninScreen(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const onPressLogin = () => {
    props.navigation.navigate('LoginScreen');
  };


  // Function to make email be usable as a key
  function emailToKey(email) {
    return email.replace(".", ",");
  }

  // Function to see if email exists
  function checkEmailExists(email) {
    const usersRef = ref(db, "userinfo");
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        console.log(email)
        Object.keys(users).forEach((userId) => {
          if (users[userId].email === email) {
          console.log(`Email exists in user key: ${userId}`);
          }
      });
    } else {
      console.log("No data available");
    }
    }, (error) => {
      console.error(error);
    });
  }

  //Function to make sure password meets requirements
  function validatePassword(password) {
    // Check if password is at least 6 characters long and contains at least one digit
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  }

  function onPressSignUp () {

    // Check if boxes are left blank
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Please fill in all required fields")
      return
    }

    //Create Display Name if one is not given
    if(displayName.trim() === '') {
      const newName = firstName.trim() + ' ' + lastName.trim();
      setDisplayName(newName);
      return
    }

    // Check that passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    //Check that password meets requirements
    if (!validatePassword(password)) {
      alert('Password must be at least 6 characters long and contain at least one number and at least one capital letter.');
      return
    }

    if(!checkEmailExists(email)) {
      alert('Account with this email already exists')
      return
    }


    // Create Account to firebase users database
    console.log(email, password)
    const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          set(ref(db, 'userinfo/' + userCredential.user.uid), {
              firstName: firstName,
              lastName: lastName,
              displayName: displayName,
              email: email,
            });
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    
    // Navigate tp Login Screen
      props.navigation.navigate('LoginScreen')


  };




    return(
          // KeyboardAvoidingView allows the input fields to be seen when the keyboard pops up
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View style = {styles.container}>

              {/* Wac Connect Logo */}
              <Image style={styles.image} source={require("./assets/WacConnectLogo.jpg")} /> 

              {/* First name input*/}
              <View style={styles.inputView}>
                <View style={[styles.iconContainer]}>
                  <Ionicons name="person-circle" size={25} color="black" />
                </View>
                <TextInput
                  style={styles.TextInput}
                  placeholder="First Name*"
                  placeholderTextColor="black"
                  onChangeText={(firstName) => setFirstName(firstName)}
                /> 
              </View> 

              {/* Last name input*/}
              <View style={styles.inputView}>
                <View style={[styles.iconContainer]}>
                  <Ionicons name="person-circle" size={25} color="black" />
                </View>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Last Name*"
                  placeholderTextColor="black"
                  onChangeText={(lastName) => setLastName(lastName)}
                /> 
              </View> 

              {/* Display name input*/}
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

              {/* Email input*/}
              <View style={styles.inputView}>
                <View style={[styles.iconContainer]}>
                  <Ionicons name="mail" size={25} color="black" />
                </View>
                <TextInput
                  style={styles.TextInput}
                  placeholder="School Email*"
                  placeholderTextColor="black"
                  onChangeText={(email) => setEmail(email)}
                /> 
              </View> 

              {/* Create Password input*/}
              <View style={styles.inputView}>
                <View style={[styles.iconContainer]}>
                  <Ionicons name="key" size={25} color="black" />
                </View>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Create Password*"
                  placeholderTextColor="black"
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry = {!showPassword}
                /> 
                <TouchableOpacity onPress={toggleShowPassword}>
                  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={15} />
                </TouchableOpacity>
              </View> 

              {/* Confirm Password input*/}
              <View style={styles.inputView}>
                <View style={[styles.iconContainer]}>
                  <Ionicons name="key" size={25} color="black" />
                </View>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Confirm Password*"
                  placeholderTextColor="black"
                  onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                  secureTextEntry = {!showPassword}
                /> 
                <TouchableOpacity onPress={toggleShowPassword}>
                  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={15} />
                </TouchableOpacity>
              </View> 

              {/* Sign Up Button*/}
              <TouchableOpacity
                style = {[styles.signupBtn]}
                onPress = {onPressSignUp} >
                  <Text
                    Title = "LoginScreen"
                    style={styles.signupText}
                    >CREATE ACCOUNT</Text>
                </TouchableOpacity>

              {/* Already Have an account*/}
                <View style = {styles.returnToLogin}>
                    <TouchableOpacity
                    onPress={onPressLogin}>
                        <Text> Already have an account?</Text>
                    
                    </TouchableOpacity>
                </View>
            </View>
          </KeyboardAvoidingView>
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
      marginTop: 20
    },

    signupBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      backgroundColor: "#BBC0C4",
    },
})

export default SigninScreen;