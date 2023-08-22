import { deleteApp, initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCw4UjAu5Oafw-M-jVB8tKOxsoSBcjY4DQ",
    authDomain: "get-a-doctors-note.firebaseapp.com",
    projectId: "get-a-doctors-note",
    storageBucket: "get-a-doctors-note.appspot.com",
    messagingSenderId: "172467966223",
    appId: "1:172467966223:web:cea3ffd0e6394a497cae7a",
    measurementId: "G-9S52M0W2C2"
  };
  
let firebaseApp;

if(!getApps().length){
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApp();
    deleteApp(firebaseApp);
    firebaseApp = initializeApp(firebaseConfig);
}
  
export const db = getFirestore(firebaseApp);