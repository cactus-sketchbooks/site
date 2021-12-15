
import firebase from 'firebase';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyBFKdALM-tQ5BXODhe5hsZSHxUgUgWQM-E",
    authDomain: "cactus-sketchbooks.firebaseapp.com",
    databaseURL: "https://cactus-sketchbooks-default-rtdb.firebaseio.com",
    projectId: "cactus-sketchbooks",
    storageBucket: "cactus-sketchbooks.appspot.com",
    messagingSenderId: "36904152582",
    appId: "1:36904152582:web:4f866461bb3c93059b9d87",
    measurementId: "G-YFYMTZ2910"
  };
  
firebase.initializeApp(firebaseConfig)

export default firebaseConfig;