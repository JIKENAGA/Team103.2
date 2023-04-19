import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db} from './Firebase/firebase';
import { getDatabase, ref, query, orderByChild, startAt, endAt, onValue, push, set, equalTo } from 'firebase/database';
import {Ionicons} from '@expo/vector-icons';
import { getAuth, currentUser,} from 'firebase/auth';

export default function SearchScreen(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Navigate back to home screen
  const onPressHomeScreen = () => {
   props.navigation.navigate('HomeScreen');
  };


  // Query the database for short titles that contain the inputted search
  const handleSearch = () => {
    const dataRef = ref(db, 'classes');
    const queryRef = query(
      dataRef,
      orderByChild('Short Title'),
      endAt(searchTerm.toLowerCase() + '\uf8ff')
    );
    const results = [];

    onValue(queryRef, (snapshot) => {
      snapshot.forEach((child) => {
        const data = child.val();
        if (data['Short Title'].toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push(data);
        }
      });
      setSearchResults(results);
    });
  };

  const auth = getAuth();

  // Handles adding the userId and the ClassId to the classrelation table
  const handleAdd = (courseId) => {
    const userId = auth.currentUser.uid;
    const classRelationRef = ref(db, 'classRelation');
    const newClassRelationRef = push(classRelationRef);
    set(newClassRelationRef, {
      userId,
      courseId
    });
    alert("Course Added")
  };


  // Creates the result list and handles the result boxes
  const renderSearchResult = ({ item }) => {
    const userId = auth.currentUser.uid;
    const classRelationRef = ref(db, 'classRelation');

    // Query the classRelation table to get all nodes with userId equal to the current user's id
    const queryRef = query(classRelationRef, orderByChild('userId'), equalTo(userId));
    const courseIdList = [];
    // Add all of the courseIds the user is in to list
    onValue(queryRef, (snapshot) => {
      snapshot.forEach((child) => {
        const data = child.val();
        courseIdList.push(data['courseId']);
      });
    });
    // If courseId is in list with courses user is in it will not display in results
    if (courseIdList.includes(item['Course'])) { 
      return null;
    }
    return (
      <TouchableOpacity style={styles.result} onPress={() => console.log(`Pressed ${item['Short Title']}`)}>
        <Text style={styles.resultText}>{item['Short Title']}</Text>
        <Text style={styles.courseIdText}>{item['Course']}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item['Course'])}>
          <Ionicons name="add" size={20} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style = {styles.header}>
        <TouchableOpacity style = {styles.iconWrapper} onPress={onPressHomeScreen}>
          <Ionicons name="md-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Search Classes</Text>
      </View>


      <View style={styles.input}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter search term"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <View style={[styles.iconContainer]}>
          <Ionicons name="search" size={25} color="gray" />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={searchResults}
        renderItem={renderSearchResult}
        keyExtractor={(item) => item['Course']}
        style={styles.resultsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  resultsList: {
    marginTop: 20,
  },
  result: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
  },
  iconWrapper: {
    marginTop: 8,
    marginRight: 10,
  },
  icon: {
    marginLeft: 10
  },
  resultId: {
    fontSize: 12,
    color: '#8a000d',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginRight: 5,
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 5,
  },
  courseIdText: {
    color: '#8a000d'
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  iconContainer: {
    paddingRight: 5,
  }
});