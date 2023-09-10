import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../utils/firebase.config";
import { AuthContext } from "../context/AuthContext";
import { XMarkIcon }from "@heroicons/react/24/solid";

export default function Navbar({handleSidebar, hiddenSidebar}) {
  const { currentUser } = useContext(AuthContext);
  
  const handleSignout = async () => {
    await signOut(auth);
  };

  const handleEffect = () => handleSidebar()

  return (
    <div className="flex justify-between p-3 bg-brand-coal">
      <h1 className="font-black text-xl hidden md:inline">
        Chat<span className="text-brand-ena">Chat</span>
      </h1>
      <div className="flex items-center gap-x-2 justify-between md:justify-end w-full md:w-auto">
        <img
          src={currentUser.photoURL}
          className="h-7 w-7 rounded-full object-cover"
        />
        <span className="font-semibold hidden lg:inline">{currentUser.displayName}</span>
        <button
          onClick={handleSignout}
          className="bg-brand-riri px-2 py-1 rounded-md text-sm font-semibold
        hover:opacity-50 transition-all duration-200"
        >
          logout
        </button>
        <XMarkIcon className="w-7 hidden" onClick={handleEffect}/>
      </div>
    </div>
  );
}
