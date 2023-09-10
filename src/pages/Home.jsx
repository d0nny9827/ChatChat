import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import MainChat from "../components/MainChat";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [hiddenSidebar, setHiddenSidebar] = useState(false)

  const handleSidebar = () => {
    setHiddenSidebar(!hiddenSidebar)
  }
  return (
    <div className="parentContainer">
      <div className="border-2 border-brand-ice/20 w-[90%] sm:max-w-7xl h-[700px] shadow-2xl rounded-lg flex overflow-x-hidden">
        <Sidebar handleSidebar={handleSidebar} hiddenSidebar={hiddenSidebar}/>
        <MainChat hiddenSidebar={hiddenSidebar} handleSidebar={handleSidebar}/>
      </div>
    </div>
  );
}
