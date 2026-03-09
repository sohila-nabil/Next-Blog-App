import { blog_data } from "../Assets/assets";
import React from "react";
import BlogsFilter from "./BlogsFilter";

const BlogList = () => {
  return (
      <BlogsFilter blogs={blog_data} />
  );
};

export default BlogList;
