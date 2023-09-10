import React, { useContext, useEffect, useState } from "react";
import SingleMessage from "./SingleMessage";
import { ChatContext } from "../context/chatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase.config";

export default function CurrentChatContainer() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (data.chatId) {
      const chatDocRef = doc(db, "oneOnOneChats", data.chatId);
      const unsub = onSnapshot(chatDocRef, (doc) => {
        if (doc.exists()) {
          const chatData = doc.data();
          const chatMessages = chatData.messages || [];

          setMessages(chatMessages);
        } else {
          setMessages([]);
        }
      });

      return () => {
        unsub();
      };
    }
  }, [data.chatId]);
  
  return (
    <div
      className="bg-brand-ice/5 h-[calc(100%-116px)] p-3 overflow-y-auto scrollbar-hide !scrollbar-thin !scrollbar-track-transparent
    !scrollbar-thumb-brand-ramu !scrollbar-thumb-rounded-full"
    >
      {messages.map((message) => (
        <SingleMessage message={message} key={message.id} />
      ))}
    </div>
  );
}
