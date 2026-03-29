"use client";
import React from "react";
import BlogItem from "./BlogItem";

const BlogsFilter = ({ blogs }) => {
  return (
    <div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-11">
        {blogs.map((blog) => (
          <BlogItem key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsFilter;
