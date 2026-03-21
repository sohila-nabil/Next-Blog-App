"use client";
import { assets } from "../../Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const SidebarCom = () => {
  const menuItems = [
    { href: "/", icon: HiChartPie, label: "Dashboard" },
    { href: "/admin/addBlog", icon: HiViewBoards, label: "Add Blog" },
    { href: "/admin/blogList", icon: HiInbox, label: "Blog List" },
    { href: "/admin/users", icon: HiUser, label: "Users" },
    // {
    //   href: "/admin/subscriptions",
    //   icon: HiShoppingBag,
    //   label: "Subscriptions",
    // },
    {
      href: "#",
      icon: HiArrowSmRight,
      label: "Sign In",
      className: "text-red-600",
    },
    { href: "#", icon: HiTable, label: "Sign Up" },
  ];

  return (
    <div className="w-20 sm:w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Logo Section */}
      <div className="flex items-center px-4 py-5 border-b border-gray-200">
        <Image
          src={assets.logo}
          alt="Logo"
          width={36}
          height={36}
          className="rounded-lg shrink-0"
        />
        <span className="hidden sm:block ml-3 font-semibold text-gray-800 text-lg">
          Admin Panel
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="px-2 py-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 group ${
                  item.className || "text-gray-700 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="hidden sm:block ml-3 text-sm font-medium">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center px-2">
          <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-medium">A</span>
          </div>
          <div className="hidden sm:block ml-3 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">
              Admin User
            </p>
            <p className="text-xs text-gray-500 truncate">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarCom;
