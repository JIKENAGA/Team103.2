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
  FlatList,
  KeyboardAvoidingView,
  ListItem,
  ActivityIndicator
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { getAuth, currentUser,} from 'firebase/auth';
import { getDatabase, ref, query, orderByChild, startAt, endAt, onValue, push, set, equalTo, get, onChildAdded, limitToFirst, serverTimestamp, child } from 'firebase/database';
import { db} from './Firebase/firebase';

function ChatScreen(props) {
  const { chatId } = props.route.params;
  // const [chatId, setChatId] = useState("");
  const [messageList, setMessageList] = useState([])
  const [loading, setLoading] = useState(true);

  const onPressLogin = () => {
    props.navigation.navigate('LoginScreen');
  };
  
  useEffect(()=>{
    console.log('chatId',chatId)
    async function doSomething() {
      // const chatIdRef = ref(db, 'chatRelation')
      // const chatIdRefQuery = query(chatIdRef, orderByChild('groupId'), equalTo(groupId), limitToFirst(1))
      functionPromises = []
    //   functionPromises.push(new Promise((resolve, reject)=>{
    //     onValue(chatIdRefQuery, (snapshot) => {
    //       console.log('this function was fired')
    //       const chatIds = []
    //       snapshot.forEach((childSnapshot) => {
    //         chatIds.push(childSnapshot.val().chatId)
          
    //     });
    //     setChatId(chatIds[0])
    //     console.log(chatId)
    //     resolve(snapshot.val())
    //   })}))
      
      
      functionPromises.push(new Promise((resolve, reject)=>{
      const chatsRef = ref(db, 'chats/' + chatId)

      onValue(chatsRef, async (snapshot) => {

        const promises = [];

        // The data at the reference has changed, do something here
        snapshot.forEach((childSnapshot) => {

          if (childSnapshot.exists()) {
          const promise = new Promise((resolve, reject) => {
            
            resolve(childSnapshot.val())
          })
          promises.push(promise)
        }
          

        });
        await Promise.all(promises).then((resolvedValues) => {
          const newMessageList = []
          resolvedValues.forEach((resolvedValue)=>{
            if (resolvedValue?.chatId) { // <-- check if chatId exists
              newMessageList.push(resolvedValue);
            }
          })
          setMessageList(newMessageList)

          setLoading(false);
        })
        resolve()  
      });}))
      await Promise.all(functionPromises)
    }
    
    doSomething()


  }, []);

// Navigate to Profile screen
const onPressGoProfile = () => {
  props.navigation.navigate('ProfileScreen');
};

// Navigate to class search screen

const onPressMyGroups = () => {
  props.navigation.navigate('MyGroupScreen')
}
const onPressHome = () => {
  props.navigation.navigate('HomeScreen')
}

const [message, setMessage] = useState('');
const handleSendMessage = async(event)=>{
  // event.preventDefault()
  if (message.trim() === "") {
    alert("Enter valid message");
    return;
  }
  const auth = getAuth();
  const uid = auth.currentUser.uid;
  
  const usernameRef = ref(db, 'userinfo/' + uid);
  var displayName = ''
  await get(usernameRef).then((snapshot) => {
    console.log('username',snapshot.val());
    displayName = snapshot.val().displayName
  });
  const chatRef = ref(db, 'chats/' + chatId)

  const newChatRef = push(chatRef)
  const newChatRefKey = newChatRef.key
  set(newChatRef,{
    text: message,
    name: displayName,
    createdAt: serverTimestamp(),
    chatId: newChatRefKey,
    uid
  })

  // Code to send message
  // Clear message input
  setMessage('');
};




  return(
    <View style = {styles.container}>

      <View style = {styles.topunobtainable}></View>

      <View style={styles.topcontainer}>
        <Text style={styles.topText}>Wac Connect</Text>
      </View>
      <View style = {styles.flatlist}>
      
      {loading ? (
      <Text>Loading...</Text>
    ) : (
      <FlatList
        data={messageList}
        renderItem={({ item }) => (
          <View>
            <Text>:{item.name}: {item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    )}
      
      </View>
      <KeyboardAvoidingView
      KeyboardAvoidingView style={{flex: 1}} behavior="padding" // Adjust this value as needed
    >
      <View style = {styles.messagecontainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={setMessage}
        value={message}
        placeholder="Type your message here..."
      />
      <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
        <View style={styles.button}>
        <Text style={{marginRight: 15, color:'blue'}}>
          SEND
        </Text>
        </View>
      </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
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
  flex:11,
  marginTop: 10
},
textInput:{
  flex:1,
  marginRight: 20,
  borderColor: 'gray', 
  borderWidth: 1
},
button:{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start'
},
messagecontainer:{
  flex: 1,
  flexDirection: 'row'
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
  fontSize: 16,
},

courseIdText: {
  color: '#8a000d'
},

trashCanContainer: {
  position: 'absolute',
  top: 5,
  right: 5,
},
})


export default ChatScreen