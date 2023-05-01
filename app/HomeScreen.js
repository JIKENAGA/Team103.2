import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {getAuth} from 'firebase/auth';
import {ref, query, orderByChild, onValue, equalTo, get, remove } from 'firebase/database';
import {db} from './Firebase/firebase';
import { useIsFocused } from "@react-navigation/native";


function HomeScreen(props) {
  const isFocused = useIsFocused();
  // Makes handleSearch run when this screen gets navigated to
  useEffect(() => {
      if(isFocused) {
        
        handleSearch();
        //console.log('test');
      }
    }, [props, isFocused]);

    // Navigate to log in screen
    const onPressLogin = () => {
        props.navigation.navigate('LoginScreen');
      };

    // Navigate to Profile screen
    const onPressGoProfile = () => {
      props.navigation.navigate('ProfileScreen');
    };

    // Navigate to class search screen
    const onPressSearchClass = () => {
      props.navigation.navigate('SearchClassScreen');
    };

    const onPressMyGroups = () => {
      props.navigation.navigate('MyGroupScreen')
    }

    // Creates an empty list for the handleSearch function to add data about classes into
    const [searchResults, setSearchResults] = useState([]);

    const auth = getAuth();

    // Handles querying the classRelation table to get the courseIds that the user is in and then queries the classes table to get the other information about the classes
    const handleSearch = async () => {
      const userId = auth.currentUser.uid;
      const classRelationRef = ref(db, 'classRelation');
    
      // Query the classRelation table to get all nodes with userId equal to the current user's id
      const queryRef = query(classRelationRef, orderByChild('userId'), equalTo(userId));
      const courseIdList = [];
    
      // Add all of the courseIds the user is in to list
      const querySnapshot = await get(queryRef);
      querySnapshot.forEach((child) => {
        const data = child.val();
        courseIdList.push(data.courseId);
      });
      //console.log(courseIdList);
    
      // Query the classes table with the courseIds from courseIdList to get the information about the classes and adds it to searchResults
      const classesRef = ref(db, 'classes');
      const classPromises = courseIdList.map((courseId) => {
        const classQueryRef = query(classesRef, orderByChild('Course'), equalTo(courseId));
        return get(classQueryRef);
      });
    
      Promise.all(classPromises).then((snapshots) => {
        const classesInfo = [];
        snapshots.forEach((snapshot) => {
          snapshot.forEach((child) => {
            const data = child.val();
            classesInfo.push(data);
          });
        });
        setSearchResults(classesInfo);
        //console.log('test', searchResults);
      });
    };

      const addClassButton = ({ onPress }) => {
        return (
            <TouchableOpacity style={styles.addClass} onPress={onPressSearchClass}>
              <Ionicons name="add" size={25} color="black" />
              <Text> Add Class</Text>
            </TouchableOpacity>
            
        );
      };

    

    // Collects the information from classesInfo and creates buttons based on that info
    const renderSearchResult = ({ item, index }) => {



      // Navigate to GroupScreen, "{courseId: item.Course}" sends the courseId of the corresponding class' button to the GroupScreen to be used in querying the groups table
      const onPressGroupScreen = () => {
        props.navigation.navigate('GroupScreen', {courseId: item.Course});
      }

      // Function to remove classes when trash icon is pressed
      const removeClass = async () => {
        const userId = auth.currentUser.uid;
        const classRelationRef = ref(db, 'classRelation');
        const queryRef = query(classRelationRef, orderByChild('userId'), equalTo(userId));
        
        const querySnapshot = await get(queryRef);
        querySnapshot.forEach((child) => {
          const data = child.val();
          if (data.userId === userId && data.courseId === item.Course) {
            const nodeRef = ref(db, `classRelation/${child.key}`);
            remove(nodeRef).then(() => {
              alert('Class removed successfully');
            }).catch((error) => {
              alert('Error removing class');
            });
          }
        });
        handleSearch();
      };


      // Class Buttons
      return (
        <View style={styles.classContainer}>
          <TouchableOpacity style={styles.result} onPress={onPressGroupScreen}>

            <View style = {styles.shortTitleText}>
              <Text style={styles.resultText}>{item['Short Title']}</Text>
            </View>

            <View style = {styles.courseId}>
              <Text style={styles.courseIdText}>{item['Course']}</Text>
            </View>
            
            <View style = {styles.instructorTextBox}>
              <Text style = {styles.instructorText}>{item['Instructor']} {item['Instructor 2 Name']}</Text>
            </View>

            <View style = {styles.meetingTextBox}>
              <Text style = {styles.meetingText}>{item['MeetingDays']}, {item['Start-End']}</Text>
            </View>

          </TouchableOpacity>
          <View style={styles.trashCanContainer}>
            <TouchableOpacity onPress= {removeClass}>
              <Ionicons name="trash" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      );
    };

      
    return(
        <View style = {styles.container}>

          <View style = {styles.topunobtainable}></View>

          <View style={styles.topcontainer}>
            <Text style={styles.topText}>Wac Connect</Text>
          </View>
          <View style = {styles.flatlist}>
            <FlatList
              data={searchResults}
              renderItem={renderSearchResult}
              keyExtractor={(item) => item['Course']}
              style={styles.resultsList}
              ListFooterComponent={addClassButton}
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
              <TouchableOpacity>
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
      backgroundColor: '#8a000d',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderBottomWidth: 3,
      opacity: .8,
      flex:1

    },
    flatlist:{
      flex:12,
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
      fontSize: 18,
      textDecorationLine: 'underline'
    },

    courseIdText: {
      color: '#8a000d'
    },

    trashCanContainer: {
      position: 'absolute',
      top: 5,
      right: 5,
    },

    shortTitleText: {
      position: 'absolute',
      left: 5,
      Top: 5,
    },

    courseId: {
      position: 'absolute',
      left: 5,
      top: 25,
    },

    instructorTextBox: {
      position: 'absolute',
      left: 5,
      top: 40
    },

    instructorText: {
      color: '#20BABD'
    },

    meetingTextBox: {
      position: 'absolute',
      left: 5,
      top: 56
    },

    meetingText: {
      color: '#B38C00'
    }
})

export default HomeScreen;