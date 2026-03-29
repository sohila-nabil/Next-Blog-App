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
   
  const res = await fetch(
    `${process.env.NEXT_BACKEND_URL_PRODUCTION}/api/blog/one/${id}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();
  const blog = data.blog;

 if (!isLoaded) return null;

 if (!isSignedIn || user?.publicMetadata?.role !== "admin") {
   return (
     <div className="p-8 max-w-5xl bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
       <div className=" mx-auto">
         <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
           User Management
         </h1>
         <div className="mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
           <p className="text-gray-600">
             You are not allowed to access this page
           </p>
         </div>
       </div>
     </div>
   );
 }

return <EditBlog blog={blog} />
}
