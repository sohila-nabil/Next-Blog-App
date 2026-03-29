"use client";
import Image from "next/image";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import {
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlinePencilAlt,
  HiOutlineEye,
  HiOutlineCalendar,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { useUser } from "@clerk/nextjs";

export default function BlogDashboard() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);

  const [publishedStatus, setPublishedStatus] = useState(0);
  const [draftStatus, setDraftStatus] = useState(0);
  const itemsPerPage = 5;
  const fetchBlogs = useCallback(async (page = 1) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/get`,
        {
          page,
          limit: 6,
        },
      );
      console.log(res.data);

      setBlogs(res.data.blogs);

      setDraftStatus(res.data.draftStatus);
      setPublishedStatus(res.data.publishedStatus);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const fetchUsers = useCallback(async (page = 1) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get`,
        {
          page,
          limit: 6,
        },
      );
      console.log(res.data);
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers(1);
    }, 500);

    return () => clearTimeout(delay);
  }, [fetchUsers]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchBlogs(1);
    }, 500);

    return () => clearTimeout(delay);
  }, [fetchBlogs]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    return status === "Published"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-amber-100 text-amber-700";
  };
  if (!isLoaded) return null;

  if (!isSignedIn || user?.publicMetadata?.role !== "admin") {
    return (
      <div className="p-8 max-w-5xl bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className=" mx-auto">
          <div className="mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-600">
              You are not allowed to access this page
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Blog Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your blog content and users
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                  {users.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <HiOutlineUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Blogs</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                  {blogs.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <HiOutlineDocumentText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Published Blogs</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-1">
                  {publishedStatus}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <HiOutlineEye className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Draft Blogs</p>
                <p className="text-2xl md:text-3xl font-bold text-amber-600 mt-1">
                  {draftStatus}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <HiOutlinePencilAlt className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Users</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your blog users
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.slice(0.5).map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">
                        {user.firstName + " " + user.lastName}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">
                        {user.email}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Blogs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Blogs</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your blog posts
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                    Category
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    Created At
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blogs.slice(0, 5).map((blog) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="px-4 py-3">
                      <div className="w-12 h-10 bg-gray-100 rounded-lg overflow-hidden">
                        {blog.image ? (
                          <Image
                            width={100}
                            height={100}
                            src={blog.image.url}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <HiOutlinePhotograph className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-2 max-w-xs">
                          {blog.title}
                        </p>
                        <p className="text-xs text-gray-500 sm:hidden mt-1">
                          {blog.category}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-lg">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <HiOutlineCalendar className="w-3 h-3" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-lg ${getStatusColor(blog.status)}`}
                      >
                        {blog.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
