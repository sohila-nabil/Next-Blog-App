"use client";
import { assets } from "../Assets/assets";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";
import { SignInButton, UserButton, Show } from "@clerk/nextjs";
// import { dark, light } from "@clerk/ui/themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="py-5 mb-8 px-5 md:px-12  lg:px-28 border-b border-slate-300">
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
            <Show when="signed-in">
              <UserButton />
            </Show>
            <Show when="signed-out">
              <Link
                href={"/sign-in"}
                className="border border-slate-400 cursor-pointer py-1 px-2  rounded-[5px]"
              >
                Sign In
              </Link>
            </Show>
          </div>
        </div>
      </div>
    </div>
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
