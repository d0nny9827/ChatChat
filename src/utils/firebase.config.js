import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwc6qCTKjCaIp4458IBFZ1l40WHngicW8",
  authDomain: "realtime-chatapp-5c760.firebaseapp.com",
  projectId: "realtime-chatapp-5c760",
  storageBucket: "realtime-chatapp-5c760.appspot.com",
  messagingSenderId: "46009788461",
  appId: "1:46009788461:web:30b59a91f9ee15123d70a4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
