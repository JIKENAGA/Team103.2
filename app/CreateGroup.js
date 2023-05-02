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
import { getDatabase, ref, query, orderByChild, startAt, endAt, onValue, push, set, equalTo, get } from 'firebase/database';
import { db} from './Firebase/firebase';
// import { group } from "console";

function CreateGroup(props) {
    const { courseId } = props.route.params;
    const [groupName, setGroupName] = useState("");
    const [groupMeetingDays, setGroupMeetingDays] = useState("");
    const [groupMeetingTime, setGroupMeetingTime] = useState("");
    const [groupDesc, setGroupDesc] = useState("");
    
    
    const onPressLogin = () => {
        props.navigation.navigate('LoginScreen');
      };
      const onPressHome = () => {
        props.navigation.navigate('HomeScreen');
      };
      const onPressGroupScreen = () => {
        props.navigation.navigate('GroupScreen', {groupId: groupId});
      };

    // Navigate to Profile screen
    const onPressGoProfile = () => {
      props.navigation.navigate('ProfileScreen');
    };

    const onPressMyGroups = () => {
      props.navigation.navigate('MyGroupScreen');
    }

    const auth = getAuth();

    const onPressCreateGroup = () => {
        //console.log(courseId)
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!groupName || !groupMeetingDays || !groupMeetingTime){
            alert("Please fill out all required fields")
            return
        }

        if (!groupDesc) {
          const userId = currentUser.uid;
          const userRef = ref(db, `userinfo/${userId}`);
          get(userRef).then((snapshot) => {
            const userInfo = snapshot.val();
            const displayName = userInfo.displayName;
            setGroupDesc(`${displayName}'s Group`);
          });
        }

          const groupsRef = ref(db, 'groups')
          const newGroupsRef = push(groupsRef)
          const groupId = newGroupsRef.key;
          set(newGroupsRef, {
              course: courseId,
              groupName: groupName,
              groupMeetingDays,
              groupMeetingTime,
              groupDesc,
              groupId
            });
        
          const userId = auth.currentUser.uid;
          const groupRelationRef = ref(db, 'groupRelation');
          const newGroupRelationRef = push(groupRelationRef);
          set(newGroupRelationRef, {
            userId,
            groupId
          });

          const createChatRef = ref(db, 'chats');
          const newCreateChatRef = push(createChatRef)
          set(newCreateChatRef,{})

          chatId = newCreateChatRef.key

          const chatRef = ref(db, 'chatRelation');
          const newChatRef = push(chatRef);
          set (newChatRef,{
            groupId,
            chatId

          })
          alert("Group Created")
        
          props.navigation.navigate('GroupScreen', {courseId})
    }

    return (
        <View style = {styles.container}>
          <View style = {styles.topunobtainable}></View>

          <View style={styles.topContainer2}>
            <View style = {styles.iconContainer}>
              <TouchableOpacity  onPress={onPressGroupScreen}>
                <Ionicons name="md-arrow-back" size={30} color="white" />
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
                placeholder="Group Name*"
                placeholderTextColor="black"
                onChangeText={(groupName) => setGroupName(groupName)}
            /> 
            
            </View> 

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Meeting Days*"
                placeholderTextColor="black"
                onChangeText={(groupMeetingDays) => setGroupMeetingDays(groupMeetingDays)}
            /> 
            </View> 

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Meeting Time*"
                placeholderTextColor="black"
                onChangeText={(groupMeetingTime) => setGroupMeetingTime(groupMeetingTime)}
            /> 
            </View> 

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Short Description"
                placeholderTextColor="black"
                onChangeText={(groupDesc) => setGroupDesc(groupDesc)}
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
            <View style={{...styles.bottomBox, borderRightWidth: 2}}>
              <TouchableOpacity
                onPress={onPressLogin}>
                  <Text style = {{color: 'white'}}> Log out </Text>
              </TouchableOpacity>
            </View>

            {/* Home icon in navigation bar */}
            <View style={{...styles.bottomBox, borderRightWidth: 2}}>
              <TouchableOpacity onPress={onPressHome}>
                <Ionicons name="home" size={25} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{...styles.bottomBox, borderRightWidth: 2}}>
              <TouchableOpacity onPress={onPressMyGroups}>
                <Ionicons name="list-outline" size={25} color="white" />
              </TouchableOpacity>
            </View>

            {/* Profile icon in navigation bar */}
            <View style={styles.bottomBox}>
              <TouchableOpacity onPress={onPressGoProfile}>
                <Ionicons name="person-circle-sharp" size={25} color="white" />
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
    marginBottom: 8,
    marginRight: 20
  },
  flatlist:{
    flex:12,
    alignItems:'center',
    justifyContent: 'center',
  },

  bottomContainer: {
    height: 70,
    backgroundColor: '#8a000d',
    justifyContent: 'center',
    flexDirection: 'row',
    opacity: .8
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
    borderColor: 'black',
    borderTopWidth: 3
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