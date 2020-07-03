  import * as firebase from 'firebase'

  var firebaseConfig = {
    apiKey: "AIzaSyC8ICRppUES2XwQzPquKPGUfVPD0Dst_Nc",
    authDomain: "webchat-e1336.firebaseapp.com",
    databaseURL: "https://webchat-e1336.firebaseio.com",
    projectId: "webchat-e1336",
    storageBucket: "webchat-e1336.appspot.com",
    messagingSenderId: "965723446329",
    appId: "1:965723446329:web:7177acd3e7886c2b1041e8",
    measurementId: "G-R5973V89ML"
  };
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export const fb = firebase;
