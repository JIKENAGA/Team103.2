import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db } from './Firebase/firebase';
import { getDatabase, ref, query, orderByChild, startAt, endAt, onValue } from 'firebase/database';

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    console.log(`Searching for "${searchTerm}"...`);
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
      console.log(results);
      setSearchResults(results);
    });
  };

  const renderSearchResult = ({ item }) => {
    return (
      <TouchableOpacity style={styles.result} onPress={() => console.log(`Pressed ${item['Short Title']}`)}>
        <Text style={styles.resultText}>{item['Short Title']}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Classes</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter search term"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={searchResults}
        renderItem={renderSearchResult}
        keyExtractor={(item) => item['ID']}
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
});









// import React, { useState, useEffect, FlatList } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
// import 'firebase/firestore';
// import { db } from './Firebase/firebase';
// import { getDatabase, ref, query, orderByChild, startAt, endAt, onValue, } from 'firebase/database';


// export default function SearchScreen() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);


//   const handleSearch = () => {
//     console.log(`Searching for "${searchTerm}"...`);
//     const dataRef = ref(db, 'classes');
//     const queryRef = query(
//       dataRef,
//       orderByChild('Short Title'),
//       endAt(searchTerm.toLowerCase() + '\uf8ff')
//     );
//     //console.log(queryRef)
//     const results = [];
  
//     onValue(queryRef, (snapshot) => {
//       snapshot.forEach((child) => {
//         const data = child.val();
//         if (data['Short Title'].toLowerCase().includes(searchTerm.toLowerCase())) {
//           results.push(data);
//         }
//       });
//       console.log(results);
//       setSearchResults(results);
//     });
//   };

//   const renderSearchResults = ({ item }) => {
//     return (
//       <View>
//         <Text>{item}</Text>
//       </View>
//     );
//   };

  

//   return (
//     <View style={styles.container}>
//     <Text style={styles.title}>Search Classes</Text>

//     <TextInput
//       style={styles.input}
//       placeholder="Enter search term"
//       value={searchTerm}
//       onChangeText={(text) => setSearchTerm(text)}
//     />

//     <TouchableOpacity
//       style={styles.button}
//       onPress={handleSearch}
//     >
//       <Text style={styles.buttonText}>Search</Text>
//     </TouchableOpacity>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   padding: 20,
// },
// title: {
//   fontSize: 20,
//   fontWeight: 'bold',
//   marginTop: 30,
//   marginBottom: 20,
// },
// input: {
//   height: 40,
//   borderColor: 'gray',
//   borderWidth: 1,
//   marginBottom: 10,
// },
// button: {
//   backgroundColor: 'gray',
//   padding: 10,
//   borderRadius: 5,
// },
// buttonText: {
//   color: 'white',
//   textAlign: 'center',
// },
// });


