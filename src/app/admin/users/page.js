"use client";
import Image from "next/image";
import { useState } from "react";
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

  // Fake user data
  const users = [
    {
      id: "USR001",
      avatar: "https://i.pravatar.cc/100?u=1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      role: "Admin",
      status: "Active",
      lastActive: "2024-03-17T10:30:00",
      joinDate: "2023-06-15",
      orders: 156,
      totalSpent: 12450.75,
      verified: true,
    },
    {
      id: "USR002",
      avatar: "https://i.pravatar.cc/100?u=2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, USA",
      role: "Editor",
      status: "Active",
      lastActive: "2024-03-17T09:15:00",
      joinDate: "2023-08-22",
      orders: 89,
      totalSpent: 6780.5,
      verified: true,
    },
    {
      id: "USR003",
      avatar: "https://i.pravatar.cc/100?u=3",
      name: "Mike Johnson",
      email: "mike.j@example.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, USA",
      role: "User",
      status: "Active",
      lastActive: "2024-03-16T18:45:00",
      joinDate: "2023-11-10",
      orders: 34,
      totalSpent: 2340.25,
      verified: true,
    },
    {
      id: "USR004",
      avatar: "https://i.pravatar.cc/100?u=4",
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      phone: "+1 (555) 456-7890",
      location: "Houston, USA",
      role: "Moderator",
      status: "Active",
      lastActive: "2024-03-17T08:20:00",
      joinDate: "2023-09-05",
      orders: 67,
      totalSpent: 5430.0,
      verified: true,
    },
    {
      id: "USR005",
      avatar: "https://i.pravatar.cc/100?u=5",
      name: "Alex Chen",
      email: "alex.chen@example.com",
      phone: "+1 (555) 567-8901",
      location: "San Francisco, USA",
      role: "User",
      status: "Inactive",
      lastActive: "2024-03-10T14:30:00",
      joinDate: "2024-01-20",
      orders: 5,
      totalSpent: 450.99,
      verified: false,
    },
    {
      id: "USR006",
      avatar: "https://i.pravatar.cc/100?u=6",
      name: "Emily Brown",
      email: "emily.b@example.com",
      phone: "+1 (555) 678-9012",
      location: "Miami, USA",
      role: "Editor",
      status: "Active",
      lastActive: "2024-03-17T11:00:00",
      joinDate: "2023-07-12",
      orders: 123,
      totalSpent: 9870.3,
      verified: true,
    },
    {
      id: "USR007",
      avatar: "https://i.pravatar.cc/100?u=7",
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "+1 (555) 789-0123",
      location: "Seattle, USA",
      role: "User",
      status: "Suspended",
      lastActive: "2024-03-05T16:45:00",
      joinDate: "2023-10-18",
      orders: 12,
      totalSpent: 890.5,
      verified: true,
    },
    {
      id: "USR008",
      avatar: "https://i.pravatar.cc/100?u=8",
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      phone: "+1 (555) 890-1234",
      location: "Denver, USA",
      role: "Moderator",
      status: "Active",
      lastActive: "2024-03-16T20:15:00",
      joinDate: "2023-08-30",
      orders: 78,
      totalSpent: 6540.75,
      verified: true,
    },
  ];

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

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getLastActiveStatus = (lastActive) => {
    const now = new Date();
    const last = new Date(lastActive);
    const diffHours = Math.floor((now - last) / (1000 * 60 * 60));

    if (diffHours < 1) return "Online now";
    if (diffHours < 24) return `${diffHours} hours ago`;
    return formatDate(lastActive);
  };

  return (
    <div className="p-8 max-w-5xl bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your users, roles, and permissions
            </p>
          </div>

          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
            <HiOutlineUserAdd className="w-5 h-5" />
            <span>Add New User</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">8,549</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <HiOutlineShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full inline-flex">
              ↑ 156 this week
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Now</p>
                <p className="text-3xl font-bold text-gray-900">342</p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <HiOutlineClock className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full inline-flex">
              ↑ 12% from yesterday
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Admins</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
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
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full inline-flex">
              ↑ 3 new this month
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">New Today</p>
                <p className="text-3xl font-bold text-gray-900">28</p>
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full inline-flex">
              ↑ 5 more than yesterday
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-3xl font-bold text-gray-900">$124.5k</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full inline-flex">
              ↑ 8.2% this month
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

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Moderator">Moderator</option>
                <option value="User">User</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>

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
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Bulk Email
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
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                <tr>
                  <th className="p-5">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedRows.length === filteredUsers.length &&
                        filteredUsers.length > 0
                      }
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-50/80 transition-all group ${
                      selectedRows.includes(user.id) ? "bg-blue-50/50" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="p-5">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(user.id)}
                        onChange={() => handleSelectRow(user.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>

                    {/* User Info */}
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden ring-2 ring-white shadow-sm">
                            <Image
                              src={user.avatar}
                              alt={user.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {user.verified && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center ring-2 ring-white">
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {user.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            ID: {user.id}
                          </p>
                          <p className="text-xs text-gray-400">
                            Joined {formatDate(user.joinDate)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="p-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <HiOutlineMail className="w-4 h-4 text-gray-400" />
                          <span className="hover:text-blue-600 cursor-pointer">
                            {user.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <HiOutlinePhone className="w-4 h-4 text-gray-400" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <HiOutlineLocationMarker className="w-4 h-4 text-gray-400" />
                        <span>{user.location}</span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="p-5">
                      <span
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg ${roleColors[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-5">
                      <span
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg ${statusColors[user.status]}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Last Active */}
                    <td className="p-5">
                      <div className="text-sm text-gray-700">
                        {getLastActiveStatus(user.lastActive)}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(user.lastActive).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>

                    {/* Orders */}
                    <td className="p-5">
                      <div className="text-center">
                        <span className="text-lg font-semibold text-gray-900">
                          {user.orders}
                        </span>
                      </div>
                    </td>

                    {/* Total Spent */}
                    <td className="p-5">
                      <span className="font-medium text-gray-900">
                        {formatCurrency(user.totalSpent)}
                      </span>
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
                  {filteredUsers.length}
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
