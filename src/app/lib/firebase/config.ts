import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getApps, getApp, FirebaseOptions, FirebaseApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyA8ecnuC3hWnrq_BAGaHlUl5kiz_qGue3s",
  authDomain: "johosomu-prjmanagers.firebaseapp.com",
  projectId: "johosomu-prjmanagers",
  storageBucket: "johosomu-prjmanagers.appspot.com",
  messagingSenderId: "724784448687",
  appId: "1:724784448687:web:a861401e968397931d005a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const getFirebaseApp = (): FirebaseApp => {
    return !getApps().length ? app : getApp()
  }