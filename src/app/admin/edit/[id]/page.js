// pages/admin/addBlog.js
import React from "react";
import EditBlog from "../../../../../components/Admin/EditBlog";

export default async function EditBlogPage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_BACKEND_URL_PRODUCTION}/api/blog/one/${id}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();
  const blog = data.blog;

  

  return <EditBlog blog={blog} />;
}
