import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/storage'

// This info may be public, as firebase rules serve as protection
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_API_KEY,
  databaseURL: process.env.VUE_APP_API_KEY,
  projectId: process.env.VUE_APP_API_KEY,
  storageBucket: process.env.VUE_APP_API_KEY,
  messagingSenderId: process.env.VUE_APP_API_KEY,
  appId: process.env.VUE_APP_API_KEY,
  measurementId: process.env.VUE_APP_API_KEY
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();