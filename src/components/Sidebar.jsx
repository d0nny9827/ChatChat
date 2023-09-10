import React, { useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import AllChats from "./AllChats";

export default function Sidebar({ handleSidebar, hiddenSidebar }) {
  return (
    <div
      className={`flex-1 border-r-2 border-brand-ice/20 bg-brand-charcoal-muted overflow-y-auto overflow-x-hidden scrollbar-hide !scrollbar-thin !scrollbar-track-transparent
    !scrollbar-thumb-brand-yua !scrollbar-thumb-rounded-full`}
    >
      <Navbar handleSidebar={handleSidebar} hiddenSidebar={handleSidebar} />
      <Search />
      <AllChats />
    </div>
  );
}
