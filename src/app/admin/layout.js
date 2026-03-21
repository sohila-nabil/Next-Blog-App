import { assets } from "../../../Assets/assets";
import SidebarCom from "../../../components/Admin/Sidebar";
import Image from "next/image";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex">
      <SidebarCom />
      <main className="flex-1 ml-20 sm:ml-64 p-6 bg-gray-50 min-h-screen w-[180px]">
        {children}
      </main>
    </div>
  );
};

export default layout;
