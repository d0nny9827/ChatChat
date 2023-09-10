import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chatContext";

export default function SingleMessage({ message }) {
  const ref = useRef()

  const [isZoomed, setIsZoomed] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleImageZoom = () => {
    setIsZoomed(!isZoomed);
  };

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  },[message])

  return (
    <div
    ref={ref}
      className={`mb-4 flex gap-x-2 relative ${
        message.senderId === currentUser.uid && "flex-row-reverse"
      }`}
    >
      <div className="">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          className="w-12 h-12 rounded-full object-cover hidden sm:inline"
        />
      </div>
      <div
        className={`flex flex-col gap-y-2 ${
          message.senderId === currentUser.uid && "items-end"
        }`}
      >
        <p
          className={`max-w-max rounded-md text-sm p-2 text-brand-coal ${
            message.senderId === currentUser.uid
              ? "bg-brand-luna text-brand-ice"
              : "bg-brand-yua"
          }`}
        >
          {message.text}
        </p>
        {message.img && (
          <img
            src={message.img}
            className="w-40 rounded-md cursor-pointer"
            onClick={handleImageZoom}
          />
        )}
      </div>
      {isZoomed && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={handleImageZoom}
        >
          <div className="relative">
            <img
              src={message.img}
              alt="Zoomed Image"
              className="max-w-full max-h-full rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
