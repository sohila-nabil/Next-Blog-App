import { assets } from "../../../Assets/assets";
import Sidebar from "../../../components/Admin/Sidebar";
import Image from "next/image";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 max-h-15 px-12 border-b border-black">
            <Image src={assets.profile_icon} width={40} alt="profile_icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default layout;
