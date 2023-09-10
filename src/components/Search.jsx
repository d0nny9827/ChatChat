import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase.config";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chatContext";

export default function Search() {
  const [username, setUsername] = useState("");
  const [err, setErr] = useState(false);
  const [user, setUser] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext)

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSearchUser = async () => {
    const usersCollectionRef = collection(db, "allUsers");

    const q = query(usersCollectionRef, where("displayName", "==", username));

    try {
      // getting all docs from our query collection
      const querySnapshot = await getDocs(q);

      // turning the doc into something js can read
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleEnterKey = (event) => {
    event.key === "Enter" && handleSearchUser();
  };

  const handleSelect = async () => {
    // JavaScript compares the first letter , lowercase are bigger than uppercase
    // Example : lowercase v > uppercase B === true
    const combinedIds =
      currentUser.uid > user.uid
        ? // my id plus aisu id
          currentUser.uid + user.uid
        : // aisu id + my id
          user.uid + currentUser.uid;

    try {
      // checking if a chat exits between me and aisu
      const response = await getDoc(doc(db, "oneOnOneChats", combinedIds));

      // if not then we create a new doc(chat) with aisu
      if (!response.exists()) {
        await setDoc(doc(db, "oneOnOneChats", combinedIds), { messages: [] });

        // we are also going to add aisu info on our allChatsFromUser collection
        const currentUserDocRef = doc(db, "allChatsFromUser", currentUser.uid);
        const userDocRef = doc(db, "allChatsFromUser", user.uid);

        await updateDoc(currentUserDocRef, {
          [combinedIds + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedIds + ".date"]: serverTimestamp(),
        });

        await updateDoc(userDocRef, {
          [combinedIds + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedIds + ".date"]: serverTimestamp(),
        });
      }

      dispatch({ type: "CHANGE_USER", payload: user });
    } catch (error) {}

    setUser(null)
    setUsername("")

  };


  return (
    <div className="border-b-2 border-brand-ice/20">
      <div className="p-1">
        <input
          type="text"
          onKeyDown={handleEnterKey}
          onChange={handleNameChange}
          className="w-full p-2 bg-transparent placeholder:text-brand-ice/30 outline-none"
          placeholder="Search chat"
          value={username}
        />
      </div>
      {err && <span>No user found</span>}
      {user && (
        <div
          className="flex items-center p-3 gap-x-3 hover:bg-brand-ice/40 hover:shadow-xl transition-all duration-500 ease-out cursor-pointer"
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <span className="font-bold">{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
