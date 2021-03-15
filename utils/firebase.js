import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBmBXDgfRYs5z4DvtL_lbtkWWlx-i5JWU",
  authDomain: "foodexpert-680ae.firebaseapp.com",
  projectId: "foodexpert-680ae",
  storageBucket: "foodexpert-680ae.appspot.com",
  messagingSenderId: "426089394265",
  appId: "1:426089394265:web:9148327b3391c0ec268148"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);
