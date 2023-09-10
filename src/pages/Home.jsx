import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import MainChat from "../components/MainChat";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  return (
    <div className="parentContainer">
      <div className="border-2 border-brand-ice/20 w-[90%] sm:max-w-7xl h-[700px] shadow-2xl rounded-lg flex overflow-x-hidden">
        <Sidebar />
        <MainChat />
      </div>
    </div>
  );
}
