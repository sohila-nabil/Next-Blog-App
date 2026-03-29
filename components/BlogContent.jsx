// app/blog/[id]/BlogContent.jsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineShare,
  HiOutlineBookmark,
  HiOutlineHeart,
  HiOutlineLink,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import { RiTwitterXFill, RiFacebookFill } from "react-icons/ri";
import { useUser } from "@clerk/nextjs";
import Comment from "./Comment";

export default function BlogContent({ blog }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const { isSignedIn, user, isLoaded } = useUser();
  console.log(user);
  
  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (content) => {
    if (!content) return "5 min read";
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    return `${minutes} min read`;
  };

  const stripHtml = (html) => {
    return html?.replace(/<[^>]*>?/gm, "") || "";
  };

  const shareOnSocial = (platform) => {
    const url = window.location.href;
    const title = blog?.title;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-linear-to-r from-blue-500 to-purple-600 transition-all duration-200"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 pb-24">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 bg-blue-500/20 backdrop-blur-sm text-blue-300 text-sm font-medium rounded-full border border-blue-400/30">
              {blog?.category || "Technology"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {blog?.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-linear-to-rfrom-blue-500 to-purple-600 p-0.5">
                <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
                  {blog?.userId?.profilePicture ? (
                    <Image
                      src={blog.userId.profilePicture}
                      alt={blog?.userId?.username}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-lg font-bold">
                      {blog?.userId?.username?.charAt(0) || "A"}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-left">
                <p className="text-white font-medium">
                  {blog?.userId?.username || "Anonymous"}
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <HiOutlineCalendar className="w-3.5 h-3.5" />
                    <span>{formatDate(blog?.createdAt)}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <HiOutlineClock className="w-3.5 h-3.5" />
                    <span>{calculateReadTime(blog?.description)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blog?.image?.url && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={blog.image.url}
              alt={blog?.title}
              width={1280}
              height={720}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Action Buttons */}
          <div className="lg:w-20">
            <div className="sticky top-24 flex lg:flex-col items-center justify-center gap-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full transition-all ${
                  isLiked
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                }`}
              >
                <HiOutlineHeart className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-3 rounded-full transition-all ${
                  isBookmarked
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-500"
                }`}
              >
                <HiOutlineBookmark className="w-5 h-5" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-green-50 hover:text-green-500 transition-all"
                >
                  <HiOutlineShare className="w-5 h-5" />
                </button>

                {showShareMenu && (
                  <div className="absolute left-0 lg:left-auto lg:right-full top-0 lg:top-auto lg:bottom-0 ml-2 lg:ml-0 lg:mr-2 mb-2 lg:mb-0 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-10">
                    <div className="flex lg:flex-col gap-2">
                      <button
                        onClick={() => shareOnSocial("facebook")}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <RiFacebookFill className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => shareOnSocial("twitter")}
                        className="p-2 text-gray-600 hover:text-blue-400 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <RiTwitterXFill className="w-5 h-5" />
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                      >
                        <HiOutlineLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Introduction
              </h2>
              <div className="prose prose-lg prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {stripHtml(blog?.description).substring(0, 300)}...
                </p>
              </div>
            </div>

            {/* Full Content */}
            <div
              className="prose prose-lg prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg prose-img:shadow-md
              prose-ul:list-disc prose-ul:pl-6
              prose-ol:list-decimal prose-ol:pl-6
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
              prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100"
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            />

           

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-linear-to-rfrom-gray-50 to-gray-100 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-linear-to-rfrom-blue-500 to-purple-600 p-0.5 flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-white overflow-hidden">
                    {blog?.userId?.profilePicture ? (
                      <Image
                        src={blog.userId.profilePicture}
                        alt={blog?.userId?.username}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-xl font-bold">
                        {blog?.userId?.username?.charAt(0) || "A"}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {blog?.userId?.username || "Anonymous"}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Passionate writer and tech enthusiast sharing insights about
                    technology, development, and innovation.
                  </p>
                  <Link
                    href={`/author/${blog?.userId?._id}`}
                    className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium mt-3 hover:text-blue-700"
                  >
                    View all posts
                    <HiOutlineArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Comments Section Placeholder */}
             <Comment blog={blog} user={user} />

            {/* Navigation Between Posts */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <Link
                  href="/blogs"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <HiOutlineArrowLeft className="w-4 h-4" />
                  <span>Previous Post</span>
                </Link>
                <Link
                  href="/blogs"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <span>Next Post</span>
                  <HiOutlineArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
