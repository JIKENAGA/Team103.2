import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";


const firebaseConfig= {
    apiKey: "AIzaSyCHc-7-lUw_k7bj55sbK-zLGIJdqzPZgAw",
    authDomain: "wac-connect.firebaseapp.com",
    // databaseURL: "https://wac-connect.firebaseio.com",
    databaseURL: "https://wac-connect-default-rtdb.firebaseio.com/",
    projectID: "wac-connect",
    storageBucket: "wac-connect.appspot.com",
    messagingSenderId: "480903099235",
    appID: "1:480903099235:ios:86c7762a95030f6f909956",
}

const app = initializeApp(firebaseConfig);



export const db= getDatabase(app);

