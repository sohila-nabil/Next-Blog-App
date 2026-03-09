"use client";
import React from "react";
import BlogItem from "./BlogItem";

const BlogsFilter = ({ blogs }) => {
  const [menu, setMenu] = React.useState("All");
  const filteredBlogs =
    menu === "All" ? blogs : blogs.filter((blog) => blog.category === menu);
  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={`${menu === "All" ? "bg-black text-white" : ""} border border-black py-1 px-4 rounded-sm cursor-pointer`}
        >
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={`${menu === "Technology" ? "bg-black text-white" : ""} border border-black py-1 px-4 rounded-sm cursor-pointer`}
        >
          Technology
        </button>
        <button
          onClick={() => setMenu("Startup")}
          className={`${menu === "Startup" ? "bg-black text-white" : ""} border border-black py-1 px-4 rounded-sm cursor-pointer`}
        >
          Startup
        </button>
        <button
          onClick={() => setMenu("Lifestyle")}
          className={`${menu === "Lifestyle" ? "bg-black text-white" : ""} border border-black py-1 px-4 rounded-sm cursor-pointer`}
        >
          Lifestyle
        </button>
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-11">
        {filteredBlogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsFilter;
