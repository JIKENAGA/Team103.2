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
import "./HomeScreen"; 
import "./SigninScreen"; 
import "./ResetPasswordScreen"; 
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {FontAntDesign, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onPressLogin = () => {
    const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          props.navigation.navigate('HomeScreen');
          // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Username or password is incorrect")
        // console.error("Error signing in:", errorMessage);
      });
    console.log(auth)
  };
  const onPressSignin = () => {
    props.navigation.navigate('SigninScreen');
  };
  const onPressResetPw = () => {
    props.navigation.navigate('ResetPasswordScreen');
  };

  return (
    <View style={styles.container}>
      
      <Image style={styles.image} source={require("./assets/WacConnectLogo.jpg")} /> 
      <StatusBar style="auto" />
      <View style={styles.inputView}>

        <View style={[styles.iconContainer]}>
          <Ionicons name="mail" size={25} color="black" />
        </View>

        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#005990"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>

        <View style={[styles.iconContainer]}>
          <Ionicons name="key" size={25} color="black" />
        </View>

        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity
      onPress={onPressResetPw} >
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 

      <TouchableOpacity 
        style={styles.loginBtn}
        onPress={onPressLogin} >
        <Text
          title = "HomeSreen"
          style={styles.loginText}
          >LOGIN</Text> 
      </TouchableOpacity> 
      <TouchableOpacity
      onPress={onPressSignin} >
        <Text style={styles.signinBtn}>New here? SignIn</Text> 
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
    alignItems: "center",
    flexDirection: 'row',
  },
  Button: {

  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    //marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  signinBtn: {
    height: 30,
    marginTop: 10,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#BBC0C4",
  },
  iconContainer:{
    padding: 10,
  }
});

export default LoginScreen;

// const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   return (
//     <View style={styles.container}>
      
//       <Image style={styles.image} source={require("./assets/WacConnectLogo.jpg")} /> 
//       <StatusBar style="auto" />
//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.TextInput}
//           placeholder="Email."
//           placeholderTextColor="#003f5c"
//           onChangeText={(email) => setEmail(email)}
//         /> 
//       </View> 
//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.TextInput}
//           placeholder="Password."
//           placeholderTextColor="#003f5c"
//           secureTextEntry={true}
//           onChangeText={(password) => setPassword(password)}
//         /> 
//       </View> 
//       <TouchableOpacity>
//         <Text style={styles.forgot_button}>Forgot Password?</Text> 
//       </TouchableOpacity> 
//       <TouchableOpacity style={styles.loginBtn}>
//         <Text style={styles.loginText}>LOGIN</Text> 
//       </TouchableOpacity> 
//     </View> 
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: {
//     marginBottom: 40,
//     width: 200,
//     height: 114,
//   },
//   inputView: {
//     backgroundColor: "#C6C8CA",
//     borderRadius: 30,
//     width: "70%",
//     height: 45,
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   TextInput: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     marginLeft: 20,
//   },
//   forgot_button: {
//     height: 30,
//     marginBottom: 30,
//   },
//   loginBtn: {
//     width: "80%",
//     borderRadius: 25,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 40,
//     backgroundColor: "#BBC0C4",
//   },
// });