import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDV2rqt7XraLq6vilzpganZ8WkFZ1ZkJZQ",
  authDomain: "react-sample-9394f.firebaseapp.com",
  projectId: "react-sample-9394f",
  storageBucket: "react-sample-9394f.appspot.com",
  messagingSenderId: "1010911509878",
  appId: "1:1010911509878:web:5f6e3ca329bd030d778e57",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);