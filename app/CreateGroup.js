import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { getAuth, currentUser,} from 'firebase/auth';
import { getDatabase, ref, query, orderByChild, startAt, endAt, onValue, push, set, equalTo } from 'firebase/database';
import { db} from './Firebase/firebase';

function CreateGroup(props) {
    const { courseId } = props.route.params;
    const [groupName, setGroupName] = useState("")

    
    
    const onPressLogin = () => {
        props.navigation.navigate('LoginScreen');
      };
      const onPressHome = () => {
        props.navigation.navigate('HomeScreen');
      };
      const onPressGroupScreen = () => {
        props.navigation.navigate('GroupScreen', {courseId});
      };

    // Navigate to Profile screen
    const onPressGoProfile = () => {
      props.navigation.navigate('ProfileScreen');
    };
    const onPressCreateGroup = () => {
        console.log(courseId)
        if (!groupName){
            alert("Please enter a Group Name of at least 2 letters")
            return
        }
        const groupsRef = ref(db, 'groups')
        const newGroupsRef = push(groupsRef)
        set(newGroupsRef, {
            course: courseId,
            groupName: groupName
          });
        props.navigation.navigate('GroupScreen', {courseId})
    }

    // Navigate to class search screen

    return (
        <View style = {styles.container}>
          <View style = {styles.topunobtainable}></View>

          <View style={styles.topContainer2}>
            <View style = {styles.iconContainer}>
              <TouchableOpacity  onPress={onPressGroupScreen}>
                <Ionicons name="md-arrow-back" size={40} color="black" />
              </TouchableOpacity>
            </View>
            <View style = {styles.topcontainer}>
              <Text style={styles.topText}>Create Group</Text>
            </View>
            <View style = {styles.iconContainer}>

            </View>
          </View>
          <View style = {styles.flatlist}>
            <View style={styles.inputView}>

            <TextInput
                style={styles.TextInput}
                placeholder="Group Name"
                placeholderTextColor="#005990"
                onChangeText={(groupName) => setGroupName(groupName)}
            /> 
            </View> 
            <TouchableOpacity 
                style={styles.loginBtn}
                onPress={onPressCreateGroup} >
                <Text
                title = "HomeSreen"
                style={styles.loginText}
                >Create Group</Text> 
      </TouchableOpacity> 
          </View>
          <View style={styles.bottomContainer}>
            {/* "Log out" in navigation bar */}
            <View style={styles.bottomBox}>
              <TouchableOpacity
                onPress={onPressLogin}>
                  <Text> Log out</Text>
              </TouchableOpacity>
            </View>

            {/* Home icon in navigation bar */}
            <View style={styles.bottomBox}>
              <TouchableOpacity onPress = {onPressHome}>
                <Ionicons name="home" size={25} color="black" />
              </TouchableOpacity>
            </View>

            {/* Profile icon in navigation bar */}
            <View style={styles.bottomBox}>
              <TouchableOpacity onPress={onPressGoProfile}>
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

  topcontainer: {
    flex:4,
    justifyContent: 'center',
    alignItems: 'center',

  },
  topContainer2:{
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#8a000d',
    justifyContent: 'center',
    opacity: .8,
    borderColor: 'black',
    borderBottomWidth: 3,
  },
  iconContainer:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist:{
    flex:12,
    alignItems:'center',
    justifyContent: 'center',
  },

  bottomContainer: {
    height: 80,
    backgroundColor: 'grey',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    //marginLeft: 20,
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
  iconWrapper: {
    marginTop: 8,
    marginRight: 10,
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

  topunobtainable:{
    backgroundColor: '#8a000d',
    opacity: .8,
    flex: 1
  },
  createGroup: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
  },

  addClass: {
    backgroundColor: 'lightgray',
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 10,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'

  },

  topText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    paddingBottom: 5
  },

  bottomBox:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#545147',
  },

  image: {
    width: 50,
    height: 50,
    paddingBottom: 10
  },

  resultsList: {
    marginTop: 0,
  },

  result: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    height: 80,
    alignItems: 'center',
  },

  resultText: {
    fontSize: 16,
  },

  courseIdText: {
    color: '#8a000d'
  }
})
export default CreateGroup;