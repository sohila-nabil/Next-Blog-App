// import { assets, blog_data } from "../Assets/assets";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// const BlogItem = ({ blog }) => {
//   return (
//     <div className="max-w-72 sm:max-w-72 bg-white border border-black hover:shadow-[-7px_7px_0px_0px_#000000]">
//       <Link href={`/blogs/${blog._id}`}>
//         <Image
//           src={blog.image.url}
//           alt="blog"
//           width={400}
//           height={400}
//           className="border-b border-black"
//         />
//       </Link>

//       <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">
//         {blog.category}
//       </p>
//       <div className="p-5">
//         <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
//           {blog.title}
//         </h5>
//         <p className="mb-3 text-sm tracking-tight text-gray-700">
//           {blog.description}
//         </p>
//         <Link href={`/blogs/${blog._id}`} className=" inline-flex items-center py-2 font-semibold text-center">
//           Read More
//           <Image src={assets.arrow} alt="arrow" width={12} className=" ml-2" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default BlogItem;

"use client";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineBookmark,
  HiOutlineShare,
  HiOutlineEye,
} from "react-icons/hi";

const BlogItem = ({ blog }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatReadTime = (content) => {
    if (!content) return "5 min read";
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    return `${minutes} min read`;
  };

  const stripHtml = (html) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getExcerpt = (content, maxLength = 120) => {
    const text = stripHtml(content);
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="max-w-96 sm:max-w-96 group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
      {/* Image Container */}
      <Link
        href={`/blogs/${blog._id}`}
        className="block relative overflow-hidden h-56"
      >
        {blog.image?.url ? (
          <>
            <Image
              src={blog.image.url}
              alt={blog?.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded-full shadow-sm">
            {blog.category}
          </span>
        </div>

        {/* Bookmark Button */}
        <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
          <HiOutlineBookmark className="w-4 h-4 text-gray-700" />
        </button>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <Link href={`/blogs/${blog._id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {blog?.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {getExcerpt(blog.description, 100)}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <HiOutlineCalendar className="w-3.5 h-3.5" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HiOutlineClock className="w-3.5 h-3.5" />
            <span>{formatReadTime(blog.description)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HiOutlineUser className="w-3.5 h-3.5" />
            <span>Admin</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <Link
            href={`/blogs/${blog._id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group/link transition-colors"
          >
            Read Article
            <svg
              className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          <div className="flex items-center gap-2">
            <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <HiOutlineShare className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1 text-gray-400">
              <HiOutlineEye className="w-4 h-4" />
              <span className="text-xs">245</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 group-hover:ring-black/10 pointer-events-none" />
    </div>
  );
};

export default BlogItem;