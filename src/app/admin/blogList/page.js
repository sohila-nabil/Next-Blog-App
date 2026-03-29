"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineRefresh,
  HiDotsVertical,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineDocumentDownload,
  HiOutlinePrinter,
} from "react-icons/hi";
import Pagination from "../../../../components/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import ModalComponent from "../../../../components/Admin/Modal";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function BlogList() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [selectedRows, setSelectedRows] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [publishedStatus, setPublishedStatus] = useState(0);
  const [draftStatus, setDraftStatus] = useState(0);

  const [id, setId] = useState();

  // Status colors mapping
  const statusColors = {
    Published: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
    Draft: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(blogs.map((blog) => blog.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const fetchBlogs = useCallback(
    async (page = 1) => {
      try {
        const res = await axios.post("/api/blog/get", {
          page,
          limit: 6,
          searchTerm,
          category,
        });
        console.log(res.data);

        setBlogs(res.data.blogs);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
        setCategories(res.data.categories);
        setDraftStatus(res.data.draftStatus);
        setPublishedStatus(res.data.publishedStatus);
      } catch (error) {
        console.log(error);
      }
    },
    [searchTerm, category],
  );

  // 🚀 Initial + search/category change
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchBlogs(currentPage);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm, category, fetchBlogs, currentPage]);

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.patch(`/api/blog/status/${id}`, { status }); // <-- pass as object
      console.log(res.data);
      if (res.data.success) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((b) => (b._id === id ? { ...b, status } : b)),
        );

        toast(`${res.data.message}  to  ${status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/blog/delete/${id}`);
      if (res.data.success) {
        toast(res.data.message);
        setBlogs((prevBlogs) => prevBlogs.filter((b) => b._id !== id));
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
      toast(error);
    }
  };

  const handleView = (blog) => {
    console.log("View:", blog);
  };
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

  return (
    <div className="p-8 bg-linear-to-br from-gray-50 to-gray-100 min-h-screen w-5xl">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Blog Posts
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your blog content and track performance
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm hover:shadow">
              <HiOutlinePrinter className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>New Post</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Blogs</p>
                <p className="text-3xl font-bold text-gray-900">
                  {blogs?.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full inline-flex">
              ↑ 12% from last month
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Published</p>
                <p className="text-3xl font-bold text-gray-900">{publishedStatus}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full inline-flex">
              63% of total
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Drafts</p>
                <p className="text-3xl font-bold text-gray-900">{draftStatus}</p>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full inline-flex">
              Need review: 12
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">45.2k</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full inline-flex">
              ↑ 8.2% this week
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-1 gap-3">
              <div className="relative flex-1 max-w-md">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search blogs by title, author, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                <HiOutlineFilter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>

                  {categories.map((cat) => (
                    <option value={cat} key={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </button>
              <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all">
                <HiOutlineRefresh className="w-4 h-4" />
              </button>
            </div>

            {selectedRows.length > 0 && (
              <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl">
                <span className="text-sm text-blue-700">
                  {selectedRows.length} selected
                </span>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              {/* Table Header */}
              <thead className="bg-linear-to-r from-gray-50 to-gray-100/50">
                <tr>
                  <th className="p-5">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedRows.length === blogs.length && blogs.length > 0
                      }
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className={`hover:bg-gray-50/80 transition-all group ${
                      selectedRows.includes(blog._id) ? "bg-blue-50/50" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="p-5">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(blog._id)}
                        onChange={() => handleSelectRow(blog._id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>

                    {/* Post Info */}
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="relative group/image">
                          <div className="w-16 h-12 bg-linear-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden ring-1 ring-gray-200 group-hover/image:ring-2 group-hover/image:ring-blue-400 transition-all">
                            <Image
                              src={blog?.image.url}
                              alt={"blog.title"}
                              width={64}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white rounded-full opacity-0 group-hover/image:opacity-100 transition-all flex items-center justify-center">
                            <HiOutlineEye className="w-3 h-3" />
                          </button>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {blog.title}
                          </h3>

                          <span className="text-xs text-gray-400 mt-1 block">
                            ID: {blog._id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-5">
                      <span className="px-3 py-1.5 text-xs font-medium bg-linear-to-br from-blue-50 to-indigo-50 text-blue-700 rounded-lg border border-blue-200/50">
                        {blog.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">
                          {blog?.userId?.firstName +
                            " " +
                            blog?.userId?.lastName}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-5">
                      <select
                        value={blog.status}
                        onChange={(e) => updateStatus(blog._id, e.target.value)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer ${
                          statusColors[blog.status]
                        }`}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-px h-8 bg-gray-200"></div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-gray-900">
                            {blog.comments.length || 0}
                          </p>
                          <p className="text-xs text-gray-500">comments</p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="p-5">
                      <div className="text-sm text-gray-700">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-5">
                      <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        <Link
                        href={`/admin/edit/${blog._id}`}
                          className="cursor-pointer p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <HiOutlinePencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            (setOpenModal(true), setId(blog._id));
                          }}
                          className="cursor-pointer p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Pagination */}
          <div className="border-t border-gray-200 bg-gray-50/50 px-5 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                results{" "}
                <span className="font-medium text-gray-900">
                  {blogs.length}
                </span>{" "}
              </p>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => fetchBlogs(page)}
              />
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <ModalComponent
          openModal={openModal}
          setOpenModal={setOpenModal}
          deleteFunction={() => handleDelete(id)}
        />
      )}
    </div>
  );
}
