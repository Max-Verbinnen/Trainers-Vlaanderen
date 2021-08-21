import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/storage'

// This info may be public, as firebase rules serve as protection
const firebaseConfig = {
  apiKey: "AIzaSyD6qMKWZTbPTGzAVdVaTZ8gIG9Tl5xb73o",
  authDomain: "trainers-vlaanderen-51280.firebaseapp.com",
  databaseURL: "https://trainers-vlaanderen-51280-default-rtdb.firebaseio.com/",
  projectId: "trainers-vlaanderen-51280",
  storageBucket: "trainers-vlaanderen-51280.appspot.com",
  messagingSenderId: "45370909626",
  appId: "1:45370909626:web:cb12d14819cd4d28587383",
  measurementId: "G-GX1MLSS2R8"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();