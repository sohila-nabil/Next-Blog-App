
// components/Header.jsx
"use client";
import React from "react";
import Link from "next/link";
import { 
  HiOutlineArrowRight, 
  HiOutlineTrendingUp,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineTag
} from "react-icons/hi";

const Header = () => {
  // Statistics data
  const stats = [
    {
      label: "Blog Posts",
      value: "500+",
      icon: HiOutlineDocumentText,
      color: "blue"
    },
    {
      label: "Happy Readers",
      value: "10k+",
      icon: HiOutlineUsers,
      color: "green"
    },
    {
      label: "Expert Writers",
      value: "50+",
      icon: HiOutlineTrendingUp,
      color: "purple"
    },
    {
      label: "Categories",
      value: "15+",
      icon: HiOutlineTag,
      color: "orange"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600"
    };
    return colors[color] || colors.blue;
  };

  return (
    <header className="bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6 animate-pulse">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Welcome to BlogSpace
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Latest Blogs & Insights
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Discover thought-provoking articles, expert insights, and inspiring stories 
            from writers around the world. Stay updated with the latest trends and ideas 
            that shape our digital world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="group px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium rounded-full hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              Explore All Blogs
              <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/categories"
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-full hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              Browse Categories
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mt-12 pt-8 border-t border-gray-200">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${getColorClasses(stat.color)} mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="relative">
        <svg 
          className="absolute bottom-0 left-0 w-full h-12 md:h-16 text-white" 
          viewBox="0 0 1440 120" 
          fill="currentColor" 
          preserveAspectRatio="none"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;