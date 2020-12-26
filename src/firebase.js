import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/database' //Udemy

var firebaseConfig = {
    apiKey: "AIzaSyBAJ0UdApsas_RKFdRwKZTHKDZUJ9NJEzA",
    authDomain: "safem0de-01.firebaseapp.com",
    databaseURL: "https://safem0de-01.firebaseio.com",
    projectId: "safem0de-01",
    storageBucket: "safem0de-01.appspot.com",
    messagingSenderId: "329275356598",
    appId: "1:329275356598:web:0301167e70ba39d647bd17"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebaseApp;