import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { getAuth, updateEmail } from "firebase/auth";
import { ref, onValue, update } from "firebase/database";
import { db } from './Firebase/firebase';
import {Ionicons} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



const ProfileScreen = (props) => {
  const auth = getAuth();
  const userid = auth.currentUser.uid;

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const email = auth.currentUser.email
  //const [email, setEmail] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [newFirstName, setNewFirstName] = useState(null);
  const [newLastName, setNewLastName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [lastNameModalVisible, setLastNameModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);

  useEffect(() => {
    const userInfoRef = ref(db, 'userinfo/' + userid);

    onValue(userInfoRef, (snapshot) => {
      const userData = snapshot.val();
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      //setEmail(userData.email);
      setDisplayName(userData.displayName);
    });
  }, []);

    // Navigatio handles
    const onPressGoHome = () => {
      props.navigation.navigate('HomeScreen');
    };
    const onPressLogin = () => {
      props.navigation.navigate('LoginScreen');
    };
    const onPressGoProfile = () => {
      props.navigation.navigate('ProfileScreen');
    };
    const onPressMyGroups = () => {
      props.navigation.navigate('MyGroupScreen')
    }


  const handleSave = () => {
    const userRef = ref(db, 'userinfo/' + userid);
    const updates = {};
    
  
    // Only update fields that have been edited
    if (newDisplayName !== null && newDisplayName !== displayName) {
      updates['displayName'] = newDisplayName;
    }
    if (newFirstName !== null && newFirstName !== firstName) {
      updates['firstName'] = newFirstName;
    }
    if (newLastName !== null && newLastName !== lastName) {
      updates['lastName'] = newLastName;
    }
    if (newEmail !== null && newEmail !== email) {
      //updates['email'] = newEmail;
      updateEmail(auth.currentUser, newEmail).then(() => {
        // Email updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
    }
  
    // Check if any fields were updated
    if (Object.keys(updates).length === 0) {
      // No changes were made, so exit edit mode without saving
      setEditMode(false);
      return;
    }
  
    // Update the user's profile data with the new values
    update(userRef, updates)
      .then(() => {
        // Update was successful, so exit edit mode
        setEditMode(false);
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Update failed: ", error);
      });
  };
  const handleCancelEdit = () => {
    // Reset state to original values
    setNewDisplayName(displayName);
    setNewFirstName(firstName);
    setNewLastName(lastName);
    setNewEmail(email);

    // Exit edit mode
    setEditMode(false);
  };

  return (
    <View style={styles.screenContainer}> 
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require("./assets/no-user-image.jpg")}
          style={styles.avatar}
        />
      <View style={styles.editableItems}>
        <Text style={styles.name}>{displayName}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}> 
          <AntDesign name="edit" size={16} color="gray" />
        </TouchableOpacity>
      </View>
      </View>
  {/* Update UserName- DislayName */}
  <Modal
  animationType="slide"
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
  }}
>
  <View style={styles.modalContainer}>
  <Text>Update Your Username:</Text>
    <TextInput
      style={styles.input}
      value={newDisplayName}
      onChangeText={setNewDisplayName}
      placeholder="New Display Name"
    />
    
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.saveButton}onPress={() => {
          setModalVisible(false);
          handleSave();
        }}>
        <Ionicons name="checkmark-outline" size={20} color="green" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => {
          setModalVisible(false);
          handleCancelEdit();
        }}>
        <Ionicons name="close" size={20} color="red" />
      </TouchableOpacity>
    </View>
  </View>
</Modal>
{/* Update FisrtName */}
<View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Fist Name:</Text>
</View>
<View style={styles.editableItems}>
<TouchableOpacity onPress={() => setNameModalVisible(true)}>
        <Text style={styles.infoValue}>{firstName}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setNameModalVisible(true)}>
          <AntDesign name="edit" size={16} color="gray" />
        </TouchableOpacity>
</View>
<Modal
  animationType="slide"
  visible={nameModalVisible}
  onRequestClose={() => {
    setNameModalVisible(false);
  }}
>
  <View style={styles.modalContainer}>
  <Text>Update Your FistName:</Text>
    <TextInput
      style={styles.input}
      value={newFirstName}
      onChangeText={setNewFirstName}
      placeholder="New Fist Name"
    />
    
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.saveButton}  onPress={() => {
          setNameModalVisible(false);
          handleSave();
        }}>
        <Ionicons name="checkmark-outline" size={20} color="green" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => {
          setNameModalVisible(false);
          handleCancelEdit();
        }}>
        <Ionicons name="close" size={20} color="red" />
      </TouchableOpacity>
    </View>
  </View>
</Modal>

{/* Update Last Name */}
<View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Last Name:</Text>
</View>
<View style={styles.editableItems}>
<TouchableOpacity onPress={() => setNameModalVisible(true)}>
        <Text style={styles.infoValue}>{lastName}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setLastNameModalVisible(true)}>
          <AntDesign name="edit" size={16} color="gray" />
        </TouchableOpacity>
</View>

<Modal
  animationType="slide"
  visible={lastNameModalVisible}
  onRequestClose={() => {
    setLastNameModalVisible(false);
  }}
>
  <View style={styles.modalContainer}>
  <Text>Update Your LastName:</Text>
    <TextInput
      style={styles.input}
      value={newLastName}
      onChangeText={setNewLastName}
      placeholder="New Last Name"
    />
    
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.saveButton}  onPress={() => {
          setLastNameModalVisible(false);
          handleSave();
        }}>
        <Ionicons name="checkmark-outline" size={20} color="green" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => {
          setLastNameModalVisible(false);
          handleCancelEdit();
        }}>
        <Ionicons name="close" size={20} color="red" />
      </TouchableOpacity>
    </View>
  </View>
</Modal>

{/* Update Email */}
<View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
</View>
<View style={styles.editableItems}>
<TouchableOpacity onPress={() => setEmailModalVisible(true)}>
        <Text style={styles.infoValue}>{email}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setEmailModalVisible(true)}>
          <AntDesign name="edit" size={16} color="gray" />
        </TouchableOpacity>
</View>
<Modal
  animationType="slide"
  visible={emailModalVisible}
  onRequestClose={() => {
    setEmailModalVisible(false);
  }}
>
  <View style={styles.modalContainer}>
  <Text>Update Your Email:</Text>
    <TextInput
      style={styles.input}
      value={newEmail}
      onChangeText={setNewEmail}
      placeholder="New Email"
    />
    
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.saveButton}  onPress={() => {
          setEmailModalVisible(false);
          handleSave();
        }}>
        <Ionicons name="checkmark-outline" size={20} color="green" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => {
          setEmailModalVisible(false);
          handleCancelEdit();
        }}>
        <Ionicons name="close" size={20} color="red" />
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      {/* <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <TouchableOpacity onPress={() => setEditMode(true)}>
        <Text style={styles.infoValue}>{email}</Text></TouchableOpacity>
      </View> */}

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Bio:</Text>
        <Text style={styles.infoValue}>No bio</Text>
      </View>
    </View>


    {/* Navigation Bar */}
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
              <TouchableOpacity onPress={onPressGoHome}>
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
    
  );
};

const styles = StyleSheet.create({
  screenContainer:{
    flex: 18,
  },
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
    flexDirection: 'row',
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
  cancelButton: {
    alignItems:"stretch",
  },
  saveButton: {
    alignItems: "stretch",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  editableItems: {
    flexDirection: 'row',
  },
  input:{
    margin: 30,
    backgroundColor: "#C6C8CA",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  bottomBox:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderTopWidth: 3
  },

  bottomContainer: {
    height: 70,
    backgroundColor: '#8a000d',
    justifyContent: 'center',
    flexDirection: 'row',
    opacity: .8
  },

});

export default ProfileScreen;