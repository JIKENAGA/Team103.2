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
import { useIsFocused } from "@react-navigation/native";



function GroupScreen(props) {
    const { courseId } = props.route.params;
    const [groupData, setGroupData] = useState(null);
    const isFocused = useIsFocused();


    useEffect(() => {
        if(isFocused) {
          
          handleGroupSearch();
          console.log('searchresults', searchResults);
          //console.log('test');
        }
      }, [props, isFocused, searchResults]);

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

    const onPressMyGroups = () => {
        props.navigation.navigate('MyGroupScreen');
    }


    const auth = getAuth();
    const [searchResults, setSearchResults] = useState([]);

    const handleGroupSearch = async () => {

        const userId = auth.currentUser.uid;
        const groupsRef = ref(db, 'groups');
        
        // Query the groups table to get all nodes with courseId equal to the current course's id
        const queryRef = query(groupsRef, orderByChild('course'), equalTo(courseId));
        const courseIdList = [];
        
        // Add all of the courseIds the user is in to list
        const querySnapshot = await get(queryRef);
        querySnapshot.forEach((child) => {
            const data = child.val();
            courseIdList.push(data.groupId);
        });
        console.log(courseIdList);
        
        // Query the groups table with the courseIds from courseIdList to get the information about the groups and adds it to searchResults
        const groupsInfoRef = ref(db, 'groups');
        const groupPromises = courseIdList.map((groupId) => {
            const groupsQueryRef = query(groupsInfoRef, orderByChild('groupId'), equalTo(groupId));
            return get(groupsQueryRef);
        });
        
        Promise.all(groupPromises).then((snapshots) => {
            const groupsInfo = [];
            snapshots.forEach((snapshot) => {
            snapshot.forEach((child) => {
                const data = child.val();
                groupsInfo.push(data);
            });
            });
            setSearchResults(groupsInfo);
            // console.log('test', classesInfo);
        });
    };

    const handleAdd = (groupId) => {
        const userId = auth.currentUser.uid;
        const groupRelationRef = ref(db, 'groupRelation');
        const newGroupRelationRef = push(groupRelationRef);
        set(newGroupRelationRef, {
          userId,
          groupId
        });
        alert("Group Added")
        handleGroupSearch();
      };

    const renderSearchResult = ({ item }) => {
        const userId = auth.currentUser.uid;
        const groupRelationRef = ref(db, 'groupRelation');

        // Query the groupRelation table to get all nodes with userId equal to the current user's id
        const queryRef = query(groupRelationRef, orderByChild('userId'), equalTo(userId));
        const groupIdList = [];
        // Add all of the groupIds the user is in to list
        onValue(queryRef, (snapshot) => {
            snapshot.forEach((child) => {
                const data = child.val();
                groupIdList.push(data['groupId']);
            });
        });
        // If courseId is in list with courses user is in it will not display in results
        if (groupIdList.includes(item['groupId'])) { 
        return null;
        }
        return (
        <TouchableOpacity style={styles.result} onPress={() => console.log(`Pressed ${item['groupName']}`)}>
            <Text style={styles.resultText}>{item['groupName']}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item['groupId'])}>
                <Ionicons name="add" size={20} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
        );
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
            data={searchResults}
            renderItem = {renderSearchResult}
            keyExtractor={(item) => item['groupId']}
          />
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
    height: 70,
    backgroundColor: '#8a000d',
    justifyContent: 'center',
    flexDirection: 'row',
    opacity: .8
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
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    alignItems: 'center',
  },

  resultText: {
    fontSize: 16,
    color: 'black'
  },

  courseIdText: {
    color: '#8a000d'
  },

  addButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    padding: 10,
    borderRadius: 5,
  },
})
export default GroupScreen;