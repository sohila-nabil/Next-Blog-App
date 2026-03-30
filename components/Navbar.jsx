"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineBookmark,
} from "react-icons/hi";
import { assets } from "../Assets/assets";
import { UserButton, Show, useUser } from "@clerk/nextjs";
const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  let role;
  if (user) {
    role = user?.publicMetadata?.role;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blogs?search=${searchQuery}`;
    }
  };

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image
                src={assets.logo || "/logo.png"}
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                BlogSpace
              </span>
              <span className="text-xs text-gray-400 hidden sm:block">
                Share your thoughts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-medium transition-colors group ${
                  isActive(link.href)
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-48 lg:w-64 transition-all"
              />
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>

            {/* Icons */}
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
              <HiOutlineBookmark className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
              <HiOutlineBell className="w-5 h-5" />
            </button>

            {/* Write Button */}
            {role === "admin" && (
              <Show when="signed-in">
                <Link
                  href="/admin/addBlog"
                  className="px-5 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-full hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                >
                  Write a Blog
                </Link>
              </Show>
            )}

            {/* User Avatar */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <HiOutlineX className="w-6 h-6 text-gray-600" />
            ) : (
              <HiOutlineMenu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-3 rounded-lg font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Icons */}
            <div className="flex items-center gap-4 pt-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                <HiOutlineBookmark className="w-5 h-5" />
                <span>Saved</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                <HiOutlineBell className="w-5 h-5" />
                <span>Alerts</span>
              </button>
            </div>

            {/* Mobile Write Button */}
            <div className="pt-4 flex items-center gap-2">
              {role === "admin" && (
                <Show when="signed-in">
                  <Link
                    href="/admin/addBlog"
                    className="px-5 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-full hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                  >
                    Write a Blog
                  </Link>
                </Show>
              )}

              {/* Mobile User Profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
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
      )}
    </nav>
  );
};

export default Navbar;
