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
import {ref, query, orderByChild, onValue, equalTo } from 'firebase/database';
import {db} from './Firebase/firebase';
import { useIsFocused } from '@react-navigation/native';


function HomeScreen(props) {
  // Makes handleSearch run when this screen gets navigated to
  const isFocused = useIsFocused();
  useEffect(() => {
    handleSearch()
  }, [isFocused]);
  
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
      onValue(queryRef, (snapshot) => {
        snapshot.forEach((child) => {
          const data = child.val();
          courseIdList.push(data.courseId);
        });
        console.log(courseIdList);
      });

      // Query the classes table with the courseIds from courseIdList to get the information about the classes and adds it to searchResults
      classesInfo = []
      const classesRef = ref(db, 'classes')
      Promise.all(
        courseIdList.map((courseId) => {
          const classQueryRef = query(classesRef, orderByChild('Course'), equalTo(courseId));

          onValue(classQueryRef, (snapshot) => {
            snapshot.forEach((child) => {
              const data = child.val();
              classesInfo.push(data);
              console.log(data);
            });
            setSearchResults(classesInfo);
          });

        })
      )

    };

    // Collects the information from classesInfo and creates buttons based on that info
    const renderSearchResult = ({ item, index }) => {

      // Navigate to GroupScreen, "{courseId: item.Course}" sends the courseId of the corresponding class' button to the GroupScreen to be used in querying the groups table
      const onPressGroupScreen = () => {
        props.navigation.navigate('GroupScreen', {courseId: item.Course});
      }

      // if statement makes it so the add button gets added to the end of the list
      if (index === searchResults.length) {
        return (
          <View>
            <TouchableOpacity style = {styles.addClass} onPress={onPressSearchClass}>
              <Ionicons name = "add" size = {25} color = "black"></Ionicons>
            </TouchableOpacity>
          </View>
        );
      }

      // Class Buttons
      return (
        <View style = {styles.classContainer}>
          <TouchableOpacity style={styles.result} onPress={onPressGroupScreen}>
            <Text style={styles.resultText}>{item['Short Title']}</Text>
            <Text style={styles.courseIdText}>{item['Course']}</Text>
          </TouchableOpacity>
        </View>
      );
    };

    const ExtraButton = ({ onPress }) => {
      return (
        <View>
          <TouchableOpacity style = {styles.addClass} onPress={onPressSearchClass}>
            <Ionicons name = "add" size = {25} color = "black"></Ionicons>
          </TouchableOpacity>
        </View>
      );
    };
    return(
        <View style = {styles.container}>

          <View style = {styles.topunobtainable}></View>

          <View style={styles.topcontainer}>
            <Text style={styles.topText}>Wac Connect</Text>
          </View>

          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item['Course']}
            style={styles.resultsList}
            ListFooterComponent={<ExtraButton/>}
            />
            
          
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
              <TouchableOpacity onPress={handleSearch}>
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
      backgroundColor: '#8a000d',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderBottomWidth: 3,
      opacity: .8,
      height: 80,
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
      height: 30
    },

    addClass: {
      backgroundColor: 'lightgray',
      padding: 10,
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
      flex: 1,
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
      marginTop: 20,
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

    buttonContainer: {
      alignItems: 'center',
      marginTop: 20,
    },

    courseIdText: {
      color: '#8a000d'
    }
});

export default HomeScreen;