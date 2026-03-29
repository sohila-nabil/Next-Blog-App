"use client"
import React, { useEffect, useState } from "react";
import BlogsFilter from "./BlogsFilter";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/blog/all", {
        cache: "no-store",
      });
      const data = await res.json();
      setBlogs(data.blogs.slice(0,10));
    };

    fetchBlogs();
  }, []);
  return <BlogsFilter blogs={blogs} />;
};

export default BlogList;
