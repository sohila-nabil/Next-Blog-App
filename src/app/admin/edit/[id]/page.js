// pages/admin/addBlog.js
import React from "react";
import Editor from "../../../../../components/Admin/Tiptap ";
import Image from "next/image";
import Title from "../../../../../components/Admin/Title";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-toastify";
import EditBlog from "../../../../../components/Admin/EditBlog";
// import { useUser } from "@clerk/nextjs";

// const Delta = Quill.import("delta");

export default async function EditBlogPage({ params }) {
   const { id } = await params;
    //  const { isSignedIn, user, isLoaded } = useUser();
   
  const res = await fetch(`http://localhost:3000/api/blog/one/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  const blog = data.blog;

// if (!isLoaded) return null;

// const role = user?.publicMetadata?.role;

// if (!isSignedIn || (role !== "admin" && role !== "author")) {
//   return <div>You are not allowed to access this page</div>;
// }

return <EditBlog blog={blog} />
}
