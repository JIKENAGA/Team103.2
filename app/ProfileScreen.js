import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from './Firebase/firebase';
import {ref, set, push, child, onValue} from "firebase/database";
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProfileScreen = () => {

  const[firstName, setFirstName] = useState(null);
  const[lastName, setLastName] = useState(null);
  const[email, setEmail] = useState(null);
  const[username, setUsername] = useState(null);
  const auth = getAuth();
  const userid = auth.currentUser.uid;

  
  useEffect(() => {
    const firstNameRef = ref(db,'userinfo/' + userid + '/firstName')
    const lastNameRef = ref(db,'userinfo/' + userid + '/lastName')
    const emailRef = ref(db,'userinfo/' + userid + '/email')
    const usernameRef = ref(db,'userinfo/' + userid + '/displayName')

    onValue(firstNameRef, (snapshot) => {
      const newData = snapshot.val();
      setFirstName(newData);
    });
    onValue(lastNameRef, (snapshot) => {
      const newData = snapshot.val();
      setLastName(newData);
    });

    onValue(emailRef, (snapshot) => {
      const newData = snapshot.val();
      setEmail(newData);
    });
    onValue(usernameRef, (snapshot) => {
      const newData = snapshot.val();
      setUsername(newData);
    });




  }, []);


  const onPressLogin = () =>{
    console.log(userid, firstNameRef);
    onValue(firstNameRef, (snapshot) => {
      const firs = snapshot.val();
      console.log(data);
  })
}


  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
      
        <Image
           source={require("./assets/no-user-image.jpg")}
          style={styles.avatar}
        />
        
        <Text style={styles.name}>{username}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Full Name:</Text>
        <Text style={styles.infoValue}>{firstName} {lastName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoValue}>{email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Bio:</Text>
        <Text style={styles.infoValue}>No bio</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },
});

export default ProfileScreen;