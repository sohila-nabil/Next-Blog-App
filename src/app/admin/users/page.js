"use client";
import axios from "axios";
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
  HiOutlineUserAdd,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineShieldCheck,
  HiOutlineClock,
} from "react-icons/hi";

export default function UserList() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // Fake user data
  // const users = [
  //   {
  //     id: "USR001",
  //     avatar: "https://i.pravatar.cc/100?u=1",
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     phone: "+1 (555) 123-4567",
  //     location: "New York, USA",
  //     role: "Admin",
  //     status: "Active",
  //     lastActive: "2024-03-17T10:30:00",
  //     joinDate: "2023-06-15",
  //     orders: 156,
  //     totalSpent: 12450.75,
  //     verified: true,
  //   },
  //   {
  //     id: "USR002",
  //     avatar: "https://i.pravatar.cc/100?u=2",
  //     name: "Jane Smith",
  //     email: "jane.smith@example.com",
  //     phone: "+1 (555) 234-5678",
  //     location: "Los Angeles, USA",
  //     role: "Editor",
  //     status: "Active",
  //     lastActive: "2024-03-17T09:15:00",
  //     joinDate: "2023-08-22",
  //     orders: 89,
  //     totalSpent: 6780.5,
  //     verified: true,
  //   },
  //   {
  //     id: "USR003",
  //     avatar: "https://i.pravatar.cc/100?u=3",
  //     name: "Mike Johnson",
  //     email: "mike.j@example.com",
  //     phone: "+1 (555) 345-6789",
  //     location: "Chicago, USA",
  //     role: "User",
  //     status: "Active",
  //     lastActive: "2024-03-16T18:45:00",
  //     joinDate: "2023-11-10",
  //     orders: 34,
  //     totalSpent: 2340.25,
  //     verified: true,
  //   },
  //   {
  //     id: "USR004",
  //     avatar: "https://i.pravatar.cc/100?u=4",
  //     name: "Sarah Wilson",
  //     email: "sarah.w@example.com",
  //     phone: "+1 (555) 456-7890",
  //     location: "Houston, USA",
  //     role: "Moderator",
  //     status: "Active",
  //     lastActive: "2024-03-17T08:20:00",
  //     joinDate: "2023-09-05",
  //     orders: 67,
  //     totalSpent: 5430.0,
  //     verified: true,
  //   },
  //   {
  //     id: "USR005",
  //     avatar: "https://i.pravatar.cc/100?u=5",
  //     name: "Alex Chen",
  //     email: "alex.chen@example.com",
  //     phone: "+1 (555) 567-8901",
  //     location: "San Francisco, USA",
  //     role: "User",
  //     status: "Inactive",
  //     lastActive: "2024-03-10T14:30:00",
  //     joinDate: "2024-01-20",
  //     orders: 5,
  //     totalSpent: 450.99,
  //     verified: false,
  //   },
  //   {
  //     id: "USR006",
  //     avatar: "https://i.pravatar.cc/100?u=6",
  //     name: "Emily Brown",
  //     email: "emily.b@example.com",
  //     phone: "+1 (555) 678-9012",
  //     location: "Miami, USA",
  //     role: "Editor",
  //     status: "Active",
  //     lastActive: "2024-03-17T11:00:00",
  //     joinDate: "2023-07-12",
  //     orders: 123,
  //     totalSpent: 9870.3,
  //     verified: true,
  //   },
  //   {
  //     id: "USR007",
  //     avatar: "https://i.pravatar.cc/100?u=7",
  //     name: "David Lee",
  //     email: "david.lee@example.com",
  //     phone: "+1 (555) 789-0123",
  //     location: "Seattle, USA",
  //     role: "User",
  //     status: "Suspended",
  //     lastActive: "2024-03-05T16:45:00",
  //     joinDate: "2023-10-18",
  //     orders: 12,
  //     totalSpent: 890.5,
  //     verified: true,
  //   },
  //   {
  //     id: "USR008",
  //     avatar: "https://i.pravatar.cc/100?u=8",
  //     name: "Lisa Anderson",
  //     email: "lisa.a@example.com",
  //     phone: "+1 (555) 890-1234",
  //     location: "Denver, USA",
  //     role: "Moderator",
  //     status: "Active",
  //     lastActive: "2024-03-16T20:15:00",
  //     joinDate: "2023-08-30",
  //     orders: 78,
  //     totalSpent: 6540.75,
  //     verified: true,
  //   },
  // ];

  // Role colors
  const roleColors = {
    Admin: "bg-purple-100 text-purple-700 ring-1 ring-purple-600/20",
    Editor: "bg-blue-100 text-blue-700 ring-1 ring-blue-600/20",
    Moderator: "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-600/20",
    User: "bg-gray-100 text-gray-700 ring-1 ring-gray-600/20",
  };

  // Status colors
  const statusColors = {
    Active: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-600/20",
    Inactive: "bg-amber-100 text-amber-700 ring-1 ring-amber-600/20",
    Suspended: "bg-red-100 text-red-700 ring-1 ring-red-600/20",
  };

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

  const handleDelete = (user) => {
    console.log("Delete user:", user);
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
                        selectedRows.length === users.length &&
                        users.length > 0
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
                          onClick={() => handleDelete(user)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete User"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <HiDotsVertical className="w-4 h-4" />
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
                Showing <span className="font-medium text-gray-900">1</span> to{" "}
                <span className="font-medium text-gray-900">
                  {users.length}
                </span>{" "}
                of <span className="font-medium text-gray-900">8,549</span>{" "}
                users
              </p>

              <div className="flex items-center gap-2">
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-white hover:border-gray-300 transition-all disabled:opacity-50">
                  <HiOutlineChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all">
                  1
                </button>
                <button className="px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 rounded-lg transition-all">
                  2
                </button>
                <button className="px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 rounded-lg transition-all">
                  3
                </button>
                <button className="px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 rounded-lg transition-all">
                  4
                </button>
                <span className="text-gray-400">...</span>
                <button className="px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 rounded-lg transition-all">
                  12
                </button>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-white hover:border-gray-300 transition-all">
                  <HiOutlineChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
