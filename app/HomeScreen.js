import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
function HomeScreen(props) {
    const onPressLogin = () => {
        props.navigation.navigate('LoginScreen');
      };
      const onPressGoProfile = () => {
        props.navigation.navigate('ProfileScreen');
      };
      const onPressSearchClass = () => {
        props.navigation.navigate('SearchClassScreen');
      };

    const buttonsList = ["test1", "test2","test3","+"]
    var buttonsListArr = [];
    for (let i = 0; i < buttonsList.length;i++){

      if (i==buttonsList.length-1){
        buttonsListArr.push(
          <TouchableOpacity onPress={onPressSearchClass} style={styles.appPlusButtonContainer}>
            <Text style={styles.appButtonText}>{buttonsList[i]}</Text>
          </TouchableOpacity>
        )
      }
      if (i!=buttonsList.length-1){
        buttonsListArr.push(
          <TouchableOpacity style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{buttonsList[i]}</Text>
          </TouchableOpacity>
        )
      }
    }

    return(

        <View style = {styles.container}>
          <View style = {styles.topunobtainable}></View>
          <View style={styles.topcontainer}>
            <Text style={styles.appButtonText}>Wac Connect</Text>
          </View>
          <View style={{flex:18}}>
            <ScrollView style={styles.scrollView}>
            {buttonsListArr}
            </ScrollView>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomBox}>
              <TouchableOpacity
                onPress={onPressLogin}>
                  <Text> Log out</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomBox}>
              <TouchableOpacity>
              <Ionicons name="home" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.bottomBox}>
            <TouchableOpacity
            onPress={onPressGoProfile}>
            <Ionicons name="person-circle-sharp" size={25} color="black" />
            </TouchableOpacity>
            </View>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",

    },
    scrollView:{
      flex: 18,
      backgroundColor:'white',
      centerContent: true
    },
    text: {
      fontSize: 42,
    },
    topcontainer: {
      flex:2,
      backgroundColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomContainer: {
      flex:2,
      backgroundColor: 'grey',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    topunobtainable:{
      flex:1,
      backgroundColor: 'grey',
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#bebdb8",
      borderRadius: 20,
      paddingVertical: 30,
      paddingHorizontal: 12,
      marginTop: 30,
      marginRight: 10,
      marginLeft: 10
    },
    appPlusButtonContainer: {
      elevation: 8,
      backgroundColor: "#bebdb8",
      borderRadius: 20,
      paddingVertical: 30,
      paddingHorizontal: 12,
      marginTop: 30,
      marginRight: 10,
      marginLeft: 10,
      opacity: 20

    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    bottomBox:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: '#545147',
    },
    image: {
      width: 50,
      height: 50,
    },
})

export default HomeScreen;