import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
import 'firebase/firestore';
import { db } from './Firebase/firebase';


export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // handle the search logic here
    console.log(`Searching for "${searchTerm}"...`);
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

    <TouchableOpacity
      style={styles.button}
      onPress={handleSearch}
    >
      <Text style={styles.buttonText}>Search</Text>
    </TouchableOpacity>
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
});


