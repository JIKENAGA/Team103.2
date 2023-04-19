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



function GroupScreen({ route }) {
    const { courseId } = route.params;
    const [groupData, setGroupData] = useState(null);


    useEffect(() => {
        // This code will run after the first render of the component
        handleGroupSearch();
      }, []);
    
      const handleGroupSearch = () => {
        const groupsRef = ref(db, 'classes');
        const queryRef = query(groupsRef, orderByChild('Course'), equalTo(courseId));
    
        onValue(queryRef, (snapshot) => {
          const data = snapshot.val();
          setGroupData(data);
          console.log(data);
        });
      };
}

export default GroupScreen;