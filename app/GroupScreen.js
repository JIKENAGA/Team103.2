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



function GroupScreen(props) {
    const { courseId } = props.route.params;
    const [groupData, setGroupData] = useState(null);


    useEffect(() => {
        // This code will run after the first render of the component
        handleGroupSearch();
      }, []);

    const onPressLogin = () => {
        props.navigation.navigate('LoginScreen');
      };
      const onPressHome = () => {
        props.navigation.navigate('HomeScreen');
      };

    // Navigate to Profile screen
    const onPressGoProfile = () => {
      props.navigation.navigate('ProfileScreen');
    };

    // Navigate to class search screen
    const onPressCreateGroup = () => {
      props.navigation.navigate('CreateGroup',{courseId});
    };

    const onPressHomeScreen = () => {
      props.navigation.navigate('HomeScreen');
    };
    
    const handleGroupSearch = async () => {
      const groupsRef = ref(db, 'groups');
      const queryRef = query(groupsRef, orderByChild('course'), equalTo(courseId));
      const groupIdList = [];

      onValue(queryRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const itemsArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            groupname: value.groupName,
          }));
          console.log(itemsArray);
          setGroupData(itemsArray)
        } else {
          console.log("No items found");
        }})

    };

    const handleButtonPress = (id) => {
      console.log(id)
    }

    const renderGroups = ({item}) =>{

    }
      return (
        <View style = {styles.container}>
          <View style = {styles.topunobtainable}></View>

          <View style={styles.topContainer2}>
            <View style = {styles.iconContainer}>
            </View>
            <View style = {styles.topcontainer}>
              <Text style={styles.topText}>Groups</Text>
            </View>
            <View style = {styles.iconContainer}>

            </View>
          </View>
          <View style = {styles.createGroup}>
            <TouchableOpacity onPress= {onPressCreateGroup}>
              <Text>Create Group</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.flatlist}>
          <FlatList
            data={groupData}
            renderItem={({ item }) => (
              <View>
                {/* <Button title={item.groupname} 
                onPress={() => handleButtonPress(item.id)} /> */}
                <TouchableOpacity style={styles.result} onPress={() => handleButtonPress(item.id)}>
                  <Text style = {styles.resultText}>Group Name: {item.groupname}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
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
  topContainer2:{
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#8a000d',
    justifyContent: 'center',
    opacity: .8,
    borderColor: 'black',
    borderBottomWidth: 3,
  },

  topcontainer: {
    flex:4,
    justifyContent: 'center',
    alignItems: 'center',

  },
  iconContainer:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist:{
    flex:11,
    marginTop: 10
  },

  bottomContainer: {
    height: 80,
    backgroundColor: 'grey',
    justifyContent: 'center',
    flexDirection: 'row',
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
    justifyContent: 'center',
    alignItems: 'center',
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
export default GroupScreen;