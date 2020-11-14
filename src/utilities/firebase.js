import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoivJeiaSJmcWeKBG7fIALhfzG72KjMwI",
  authDomain: "athletes-book-app.firebaseapp.com",
  databaseURL: "https://athletes-book-app.firebaseio.com",
  projectId: "athletes-book-app",
  storageBucket: "athletes-book-app.appspot.com",
  messagingSenderId: "1062278258674",
  appId: "1:1062278258674:web:de1dd0d35943ca0096d56b"
};

firebase.initializeApp(firebaseConfig);

export default firebase