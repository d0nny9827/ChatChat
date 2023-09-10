import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../utils/firebase.config";
import { AuthContext } from "../context/AuthContext";
import { Grid } from "react-loader-spinner";
import { ChatContext } from "../context/chatContext";

export default function AllChats() {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "allChatsFromUser", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleUserSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((user) => (
        <div
          key={user[0]}
          className="flex items-center p-3 gap-x-3 hover:bg-brand-ice/40 hover:shadow-xl transition-all duration-500 ease-out cursor-pointer"
          onClick={() => handleUserSelect(user[1].userInfo)}
        >
          <img
            src={user[1]?.userInfo?.photoURL}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <span className="font-bold">{user[1]?.userInfo?.displayName}</span>
            <p className="text-sm">{user[1]?.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
