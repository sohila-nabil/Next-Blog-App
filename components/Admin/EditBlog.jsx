"use client";
import React, { useCallback, useRef, useState } from "react";
import Title from "./Title";
import Editor from "./Tiptap ";
import ImageUpload from "./ImageUpload";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import axios from "axios";

const Delta = Quill.import("delta");

const EditBlog = ({ blog }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [content, setContent] = useState("");
  const quillRef = useRef();

  const [blogData, setBlogData] = useState({
    title: blog.title || "",
    category: blog.category || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextChange = () => {
    const html = quillRef.current.root.innerHTML;
    setContent(html);
  };
  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(e.target.files[0]);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("category", blogData.category);
    formData.append("description", content);
    formData.append("image", image);

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/edit/${blog._id}`,
        formData,
      );
      console.log(res);
      if (res.data.success) {
        toast("Blog Edit Successfully");
      }
    } catch (error) {
      toast(error);
      console.log("error creating blog font", error);
    }
  };

  if (!isLoaded) return null;

  const role = user?.publicMetadata?.role;

  if (!isSignedIn || (role !== "admin" && role !== "author")) {
    return <div>You are not allowed to access this page</div>;
  }

  const stripHtml = (html) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getExcerpt = (content) => {
    const text = stripHtml(content);
    // if (text.length <= maxLength) return text;
    return text;
  };
  console.log(blog);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <Title title={"Edit Blog"} desc={"Edit blog post"} />

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Category Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="category"
              value={blogData.category}
              onChange={handleChange}
              placeholder="Enter blog Category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description Field */}

          <div className=" mx-auto mt-10">
            <Editor
              ref={quillRef}
              defaultValue={new Delta().insert(getExcerpt(blog.description))}
              onTextChange={handleTextChange}
            />
          </div>
          <ImageUpload
            onImageChange={handleImageChange}
            image={image}
            setImage={setImage}
            preview={preview || blog.image.url}
          />

          {/* Form Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              Edit Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
