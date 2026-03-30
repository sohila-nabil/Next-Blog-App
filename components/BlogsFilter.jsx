"use client";
import React from "react";
import BlogItem from "./BlogItem";

const BlogsFilter = ({ blogs }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 xl:mx-11">
        {blogs.map((blog) => (
          <BlogItem key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsFilter;
