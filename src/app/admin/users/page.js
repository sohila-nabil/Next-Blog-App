"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineSearch,
  HiOutlineRefresh,
  HiOutlineMail,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import ModalComponent from "../../../../components/Admin/Modal";
import Pagination from "../../../../components/Pagination";
import { toast } from "react-toastify";


export default function UserList() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState();

  const fetchUsers = useCallback(
    async (page = 1) => {
      try {
        const res = await axios.post("/api/user/get", {
          page,
          limit: 6,
          searchTerm,
        });
        console.log(res.data);
        setUsers(res.data.users);
        setTotalUsers(res.data.totalUsers);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      } catch (error) {
        console.log(error);
      }
    },
    [searchTerm],
  );

  // 🚀 Initial + search/category change
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers(currentPage);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm, fetchUsers, currentPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(users.map((user) => user.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const handleView = (user) => {
    console.log("View user:", user);
  };

  const handleEdit = (user) => {
    console.log("Edit user:", user);
  };

 const handleDelete = async (id) => {
   try {
     const res = await axios.delete(`/api/user/delete/${id}`);
     if (res.data.success) {
       toast(res.data.message);
       setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
       setOpenModal(false);
     }
   } catch (error) {
     console.log(error);
     toast(error);
   }
 };

  const handleSendEmail = (user) => {
    console.log("Send email to:", user.email);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-8 max-w-5xl bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              User Management
            </h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">
                  {users.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <HiOutlineShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full inline-flex">
              ↑ 156 this week
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-1 gap-3">
              <div className="relative flex-1 max-w-md">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

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

                <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                  Export
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
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
                        selectedRows.length === users.length && users.length > 0
                      }
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>

                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className={`hover:bg-gray-50/80 transition-all group ${
                      selectedRows.includes(user._id) ? "bg-blue-50/50" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="p-5">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(user._id)}
                        onChange={() => handleSelectRow(user._id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>

                    {/* User Info */}
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden ring-2 ring-white shadow-sm">
                            <Image
                              src={user.profilePicture}
                              alt={user.username}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {user.firstName + " " + user.lastName}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            ID: {user._id}
                          </p>
                          <p className="text-xs text-gray-400">
                            Joined {formatDate(user.createdAt)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-5">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {user?.email}
                      </h3>
                    </td>

                    {/* Actions */}
                    <td className="p-5">
                      <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleView(user)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="View Profile"
                        >
                          <HiOutlineEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Edit User"
                        >
                          <HiOutlinePencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSendEmail(user)}
                          className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                          title="Send Email"
                        >
                          <HiOutlineMail className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            (setOpenModal(true), setId(user.clerkId));
                          }}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete User"
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
                  {users.length}
                </span>{" "}
              </p>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => fetchUsers(page)}
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
