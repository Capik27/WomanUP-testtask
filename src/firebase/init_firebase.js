//import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId,
	measurementId: process.env.REACT_APP_measurementId,
};
const app = initializeApp(firebaseConfig);

// const firestoreDB = initializeFirestore(app, {
// 	experimentalForceLongPolling: true,
// });

// apiKey: "AIzaSyBky1jZI5DhFUGjkhRLaFWJ4yOc2IdnLEw",
// 	authDomain: "task-list-c611a.firebaseapp.com",
// 	projectId: "task-list-c611a",
// 	storageBucket: "task-list-c611a.appspot.com",
// 	messagingSenderId: "734335373973",
// 	appId: "1:734335373973:web:e5dd06735c8108fce2019c",
// 	measurementId: "G-841RVDDZPS",

//export const auth = getAuth();
export const firestore = getFirestore();
export const storage = getStorage(app);
