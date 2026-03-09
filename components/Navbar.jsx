"use client";
import { assets } from "../Assets/assets";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src={assets.logo}
            alt="logo"
            width={180}
            className="w-32.5 sm:w-auto"
          />
        </Link>

        <Search />
        <div className="flex items-center gap-2 ">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="border border-slate-400 cursor-pointer p-2 rounded-[5px]"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <div className="relative">
            {/* <Image
              className="h-12 w-12 rounded-full"
              src={assets.profile_icon}
              alt="profile_icon"
              width={40}
            /> */}
            <button className="border border-slate-400 cursor-pointer py-1 px-2  rounded-[5px]">Sign In</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

//  <script>
//     const menuButtons = document.querySelectorAll('.menu-btn');
//     const mobileMenus = document.querySelectorAll('.mobile-menu');

//     menuButtons.forEach((btn, index) => {
//         btn.addEventListener('click', () => {
//             mobileMenus[index].classList.toggle('hidden');
//         });
//     });

// </script>
