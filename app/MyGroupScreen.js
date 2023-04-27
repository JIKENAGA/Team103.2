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


function MyGroupScreen(props) {
  
}

export default MyGroupScreen;










// const auth = getAuth();
// const [searchResults, setSearchResults] = useState([]);

// const handleGroupSearch = async () => {

//     const userId = auth.currentUser.uid;
//     const classRelationRef = ref(db, 'groupRelation');
    
//     // Query the classRelation table to get all nodes with userId equal to the current user's id
//     const queryRef = query(classRelationRef, orderByChild('userId'), equalTo(userId));
//     const courseIdList = [];
    
//     // Add all of the courseIds the user is in to list
//     const querySnapshot = await get(queryRef);
//     querySnapshot.forEach((child) => {
//         const data = child.val();
//         courseIdList.push(data.groupId);
//     });
//     console.log(courseIdList);
    
//     // Query the classes table with the courseIds from courseIdList to get the information about the classes and adds it to searchResults
//     const classesRef = ref(db, 'groups');
//     const classPromises = courseIdList.map((groupId) => {
//         const classQueryRef = query(classesRef, orderByChild('groupId'), equalTo(groupId));
//         return get(classQueryRef);
//     });
    
//     Promise.all(classPromises).then((snapshots) => {
//         const classesInfo = [];
//         snapshots.forEach((snapshot) => {
//         snapshot.forEach((child) => {
//             const data = child.val();
//             classesInfo.push(data);
//         });
//         });
//         setSearchResults(classesInfo);
//         console.log('test', classesInfo);
//     });
// };

// const renderSearchResult = ({ item }) => {
//     // Class Buttons
//     return (
//       <View style = {styles.classContainer}>
//         <TouchableOpacity style={styles.result}>
//           <Text style={styles.resultText}>{item['groupName']}</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };





//   <FlatList
//             data={searchResults}
//             renderItem = {renderSearchResult}
//             keyExtractor={(item) => item['groupId']}
//           />

