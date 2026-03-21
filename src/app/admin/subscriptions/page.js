// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import {
//   HiOutlinePencil,
//   HiOutlineTrash,
//   HiOutlineEye,
//   HiOutlineSearch,
//   HiOutlineFilter,
//   HiOutlineRefresh,
//   HiDotsVertical,
//   HiOutlineChevronLeft,
//   HiOutlineChevronRight,
//   HiOutlineCreditCard,
//   HiOutlineCalendar,
//   HiOutlineCurrencyDollar,
//   HiOutlineUsers,
//   HiOutlineChartBar,
//   HiOutlineClock,
//   HiOutlineMail,
//   HiOutlineCheckCircle,
//   HiOutlineXCircle,
//   HiOutlineBan,
// } from "react-icons/hi";

// export default function SubscriptionList() {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [planFilter, setPlanFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");

//   // Fake subscription data
//   const subscriptions = [
//     {
//       id: "SUB001",
//       userId: "USR001",
//       userName: "John Doe",
//       userAvatar: "https://i.pravatar.cc/40?u=1",
//       userEmail: "john.doe@example.com",
//       plan: "Premium Annual",
//       planType: "Annual",
//       price: 299.99,
//       currency: "USD",
//       status: "Active",
//       startDate: "2024-01-15",
//       endDate: "2025-01-15",
//       nextBilling: "2025-01-15",
//       paymentMethod: "Visa ****4242",
//       autoRenew: true,
//       features: [
//         "Unlimited access",
//         "Priority support",
//         "API access",
//         "Analytics",
//       ],
//       usage: 78,
//       usageLimit: 100,
//       invoices: 12,
//       createdAt: "2024-01-15T10:30:00",
//     },
//     {
//       id: "SUB002",
//       userId: "USR002",
//       userName: "Jane Smith",
//       userAvatar: "https://i.pravatar.cc/40?u=2",
//       userEmail: "jane.smith@example.com",
//       plan: "Premium Monthly",
//       planType: "Monthly",
//       price: 29.99,
//       currency: "USD",
//       status: "Active",
//       startDate: "2024-02-01",
//       endDate: "2024-03-01",
//       nextBilling: "2024-03-01",
//       paymentMethod: "Mastercard ****1234",
//       autoRenew: true,
//       features: ["Unlimited access", "Priority support"],
//       usage: 45,
//       usageLimit: 100,
//       invoices: 2,
//       createdAt: "2024-02-01T09:15:00",
//     },
//     {
//       id: "SUB003",
//       userId: "USR003",
//       userName: "Mike Johnson",
//       userAvatar: "https://i.pravatar.cc/40?u=3",
//       userEmail: "mike.j@example.com",
//       plan: "Basic Monthly",
//       planType: "Monthly",
//       price: 14.99,
//       currency: "USD",
//       status: "Active",
//       startDate: "2024-02-10",
//       endDate: "2024-03-10",
//       nextBilling: "2024-03-10",
//       paymentMethod: "PayPal",
//       autoRenew: true,
//       features: ["Basic access", "Email support"],
//       usage: 32,
//       usageLimit: 50,
//       invoices: 1,
//       createdAt: "2024-02-10T14:20:00",
//     },
//     {
//       id: "SUB004",
//       userId: "USR004",
//       userName: "Sarah Wilson",
//       userAvatar: "https://i.pravatar.cc/40?u=4",
//       userEmail: "sarah.w@example.com",
//       plan: "Enterprise Annual",
//       planType: "Annual",
//       price: 999.99,
//       currency: "USD",
//       status: "Active",
//       startDate: "2023-12-01",
//       endDate: "2024-12-01",
//       nextBilling: "2024-12-01",
//       paymentMethod: "Amex ****1001",
//       autoRenew: true,
//       features: [
//         "Everything in Premium",
//         "Custom features",
//         "Dedicated support",
//         "SLA",
//       ],
//       usage: 92,
//       usageLimit: 500,
//       invoices: 12,
//       createdAt: "2023-12-01T11:00:00",
//     },
//     {
//       id: "SUB005",
//       userId: "USR005",
//       userName: "Alex Chen",
//       userAvatar: "https://i.pravatar.cc/40?u=5",
//       userEmail: "alex.c@example.com",
//       plan: "Basic Monthly",
//       planType: "Monthly",
//       price: 14.99,
//       currency: "USD",
//       status: "Expired",
//       startDate: "2024-01-05",
//       endDate: "2024-02-05",
//       nextBilling: null,
//       paymentMethod: "Visa ****5678",
//       autoRenew: false,
//       features: ["Basic access", "Email support"],
//       usage: 0,
//       usageLimit: 50,
//       invoices: 1,
//       createdAt: "2024-01-05T16:45:00",
//     },
//     {
//       id: "SUB006",
//       userId: "USR006",
//       userName: "Emily Brown",
//       userAvatar: "https://i.pravatar.cc/40?u=6",
//       userEmail: "emily.b@example.com",
//       plan: "Premium Annual",
//       planType: "Annual",
//       price: 299.99,
//       currency: "USD",
//       status: "Cancelled",
//       startDate: "2023-11-15",
//       endDate: "2024-11-15",
//       nextBilling: null,
//       paymentMethod: "Mastercard ****9012",
//       autoRenew: false,
//       features: [
//         "Unlimited access",
//         "Priority support",
//         "API access",
//         "Analytics",
//       ],
//       usage: 0,
//       usageLimit: 100,
//       invoices: 3,
//       createdAt: "2023-11-15T08:30:00",
//     },
//     {
//       id: "SUB007",
//       userId: "USR007",
//       userName: "David Lee",
//       userAvatar: "https://i.pravatar.cc/40?u=7",
//       userEmail: "david.lee@example.com",
//       plan: "Premium Monthly",
//       planType: "Monthly",
//       price: 29.99,
//       currency: "USD",
//       status: "Past Due",
//       startDate: "2024-01-20",
//       endDate: "2024-02-20",
//       nextBilling: "2024-02-20",
//       paymentMethod: "PayPal",
//       autoRenew: true,
//       features: ["Unlimited access", "Priority support"],
//       usage: 0,
//       usageLimit: 100,
//       invoices: 1,
//       createdAt: "2024-01-20T13:10:00",
//     },
//     {
//       id: "SUB008",
//       userId: "USR008",
//       userName: "Lisa Anderson",
//       userAvatar: "https://i.pravatar.cc/40?u=8",
//       userEmail: "lisa.a@example.com",
//       plan: "Enterprise Annual",
//       planType: "Annual",
//       price: 999.99,
//       currency: "USD",
//       status: "Active",
//       startDate: "2024-01-01",
//       endDate: "2025-01-01",
//       nextBilling: "2025-01-01",
//       paymentMethod: "Amex ****2002",
//       autoRenew: true,
//       features: [
//         "Everything in Premium",
//         "Custom features",
//         "Dedicated support",
//         "SLA",
//       ],
//       usage: 245,
//       usageLimit: 500,
//       invoices: 13,
//       createdAt: "2024-01-01T10:00:00",
//     },
//     {
//       id: "SUB009",
//       userId: "USR009",
//       userName: "Tom Harris",
//       userAvatar: "https://i.pravatar.cc/40?u=9",
//       userEmail: "tom.h@example.com",
//       plan: "Basic Monthly",
//       planType: "Monthly",
//       price: 14.99,
//       currency: "USD",
//       status: "Trialing",
//       startDate: "2024-03-01",
//       endDate: "2024-03-15",
//       nextBilling: "2024-03-15",
//       paymentMethod: "Visa ****3344",
//       autoRenew: true,
//       features: ["Basic access", "Email support"],
//       usage: 12,
//       usageLimit: 50,
//       invoices: 0,
//       createdAt: "2024-03-01T09:00:00",
//     },
//     {
//       id: "SUB010",
//       userId: "USR010",
//       userName: "Rachel Green",
//       userAvatar: "https://i.pravatar.cc/40?u=10",
//       userEmail: "rachel.g@example.com",
//       plan: "Premium Monthly",
//       planType: "Monthly",
//       price: 29.99,
//       currency: "USD",
//       status: "Active",
//       startDate: "2024-02-15",
//       endDate: "2024-03-15",
//       nextBilling: "2024-03-15",
//       paymentMethod: "Mastercard ****7788",
//       autoRenew: true,
//       features: ["Unlimited access", "Priority support"],
//       usage: 67,
//       usageLimit: 100,
//       invoices: 1,
//       createdAt: "2024-02-15T15:30:00",
//     },
//   ];

//   // Plan colors
//   const planColors = {
//     "Basic Monthly": "bg-gray-100 text-gray-700 ring-1 ring-gray-600/20",
//     "Premium Monthly": "bg-blue-100 text-blue-700 ring-1 ring-blue-600/20",
//     "Premium Annual": "bg-purple-100 text-purple-700 ring-1 ring-purple-600/20",
//     "Enterprise Annual": "bg-amber-100 text-amber-700 ring-1 ring-amber-600/20",
//   };

//   // Status colors
//   const statusColors = {
//     Active: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-600/20",
//     Expired: "bg-gray-100 text-gray-700 ring-1 ring-gray-600/20",
//     Cancelled: "bg-red-100 text-red-700 ring-1 ring-red-600/20",
//     "Past Due": "bg-orange-100 text-orange-700 ring-1 ring-orange-600/20",
//     Trialing: "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-600/20",
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedRows(subscriptions.map((sub) => sub.id));
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   const handleSelectRow = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
//     );
//   };

//   const handleView = (subscription) => {
//     console.log("View subscription:", subscription);
//   };

//   const handleEdit = (subscription) => {
//     console.log("Edit subscription:", subscription);
//   };

//   const handleDelete = (subscription) => {
//     console.log("Delete subscription:", subscription);
//   };

//   const handleSendInvoice = (subscription) => {
//     console.log("Send invoice for:", subscription.id);
//   };

//   const handlePauseSubscription = (subscription) => {
//     console.log("Pause subscription:", subscription.id);
//   };

//   const filteredSubscriptions = subscriptions.filter((sub) => {
//     const matchesSearch =
//       sub.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       sub.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       sub.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       sub.id.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesPlan = planFilter === "all" || sub.plan === planFilter;
//     const matchesStatus = statusFilter === "all" || sub.status === statusFilter;

//     return matchesSearch && matchesPlan && matchesStatus;
//   });

//   const formatDate = (dateString) => {
//     if (!dateString) return "—";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const formatCurrency = (amount, currency = "USD") => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: currency,
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(amount);
//   };

//   const getDaysUntilBilling = (billingDate) => {
//     if (!billingDate) return null;
//     const now = new Date();
//     const billing = new Date(billingDate);
//     const diffDays = Math.ceil((billing - now) / (1000 * 60 * 60 * 24));

//     if (diffDays < 0) return "Overdue";
//     if (diffDays === 0) return "Today";
//     if (diffDays === 1) return "Tomorrow";
//     return `${diffDays} days`;
//   };

//   return (
//     <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//               Subscription Management
//             </h1>
//             <p className="text-gray-500 mt-1">
//               Manage subscriptions, billing, and plans
//             </p>
//           </div>

//           <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
//             <HiOutlineCreditCard className="w-5 h-5" />
//             <span>Create Subscription</span>
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Active Subscriptions</p>
//                 <p className="text-3xl font-bold text-gray-900">1,284</p>
//               </div>
//               <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
//                 <HiOutlineUsers className="w-6 h-6 text-emerald-600" />
//               </div>
//             </div>
//             <div className="mt-2 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full inline-flex">
//               ↑ 24 this week
//             </div>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">
//                   Monthly Recurring Revenue
//                 </p>
//                 <p className="text-3xl font-bold text-gray-900">$45.2k</p>
//               </div>
//               <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
//                 <HiOutlineCurrencyDollar className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//             <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-flex">
//               ↑ 12.5% from last month
//             </div>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Annual Revenue</p>
//                 <p className="text-3xl font-bold text-gray-900">$542.8k</p>
//               </div>
//               <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
//                 <HiOutlineChartBar className="w-6 h-6 text-purple-600" />
//               </div>
//             </div>
//             <div className="mt-2 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full inline-flex">
//               ↑ 8.3% vs last year
//             </div>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Expiring Soon</p>
//                 <p className="text-3xl font-bold text-gray-900">43</p>
//               </div>
//               <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
//                 <HiOutlineClock className="w-6 h-6 text-amber-600" />
//               </div>
//             </div>
//             <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full inline-flex">
//               Next 7 days
//             </div>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Past Due</p>
//                 <p className="text-3xl font-bold text-gray-900">12</p>
//               </div>
//               <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
//                 <HiOutlineXCircle className="w-6 h-6 text-red-600" />
//               </div>
//             </div>
//             <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full inline-flex">
//               Requires attention
//             </div>
//           </div>
//         </div>

//         {/* Filters Bar */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
//           <div className="flex flex-wrap gap-4 items-center justify-between">
//             <div className="flex flex-1 gap-3">
//               <div className="relative flex-1 max-w-md">
//                 <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search by user, email, plan, or subscription ID..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//                 />
//               </div>

//               <select
//                 value={planFilter}
//                 onChange={(e) => setPlanFilter(e.target.value)}
//                 className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
//               >
//                 <option value="all">All Plans</option>
//                 <option value="Basic Monthly">Basic Monthly</option>
//                 <option value="Premium Monthly">Premium Monthly</option>
//                 <option value="Premium Annual">Premium Annual</option>
//                 <option value="Enterprise Annual">Enterprise Annual</option>
//               </select>

//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
//               >
//                 <option value="all">All Status</option>
//                 <option value="Active">Active</option>
//                 <option value="Expired">Expired</option>
//                 <option value="Cancelled">Cancelled</option>
//                 <option value="Past Due">Past Due</option>
//                 <option value="Trialing">Trialing</option>
//               </select>

//               <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all">
//                 <HiOutlineFilter className="w-4 h-4" />
//               </button>

//               <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all">
//                 <HiOutlineRefresh className="w-4 h-4" />
//               </button>
//             </div>

//             {selectedRows.length > 0 && (
//               <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl">
//                 <span className="text-sm text-blue-700">
//                   {selectedRows.length} selected
//                 </span>
//                 <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                   Send Invoice
//                 </button>
//                 <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
//                   Pause
//                 </button>
//                 <button className="text-red-600 hover:text-red-700 text-sm font-medium">
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Subscriptions Table */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               {/* Table Header */}
//               <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
//                 <tr>
//                   <th className="p-5">
//                     <input
//                       type="checkbox"
//                       onChange={handleSelectAll}
//                       checked={
//                         selectedRows.length === filteredSubscriptions.length &&
//                         filteredSubscriptions.length > 0
//                       }
//                       className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                   </th>
//                   <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     User
//                   </th>
//                   <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Subscription
//                   </th>
//                   <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Plan
//                   </th>
//                   <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Billing Cycle
//                   </th>
//                   <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Next Billing
//                   </th>
//                   <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Payment
//                   </th>
//                   <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Usage
//                   </th>
//                   <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Invoices
//                   </th>
//                   <th className="p-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               {/* Table Body */}
//               <tbody className="divide-y divide-gray-100">
//                 {filteredSubscriptions.map((sub) => (
//                   <tr
//                     key={sub.id}
//                     className={`hover:bg-gray-50/80 transition-all group ${
//                       selectedRows.includes(sub.id) ? "bg-blue-50/50" : ""
//                     }`}
//                   >
//                     {/* Checkbox */}
//                     <td className="p-5">
//                       <input
//                         type="checkbox"
//                         checked={selectedRows.includes(sub.id)}
//                         onChange={() => handleSelectRow(sub.id)}
//                         className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                     </td>

//                     {/* User Info */}
//                     <td className="p-5">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden ring-2 ring-white">
//                           <Image
//                             src={sub.userAvatar}
//                             alt={sub.userName}
//                             width={32}
//                             height={32}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
//                             {sub.userName}
//                           </h3>
//                           <p className="text-xs text-gray-500">
//                             {sub.userEmail}
//                           </p>
//                           <p className="text-xs text-gray-400 mt-0.5">
//                             ID: {sub.id}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Subscription Details */}
//                     <td className="p-5">
//                       <div className="space-y-1">
//                         <span
//                           className={`px-2 py-1 text-xs font-medium rounded-lg ${planColors[sub.plan]}`}
//                         >
//                           {sub.plan}
//                         </span>
//                         <div className="flex items-center gap-1 text-xs text-gray-500">
//                           <HiOutlineCalendar className="w-3 h-3" />
//                           <span>Started {formatDate(sub.startDate)}</span>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Plan Type */}
//                     <td className="p-5">
//                       <span className="text-sm text-gray-700">
//                         {sub.planType}
//                       </span>
//                     </td>

//                     {/* Price */}
//                     <td className="p-5">
//                       <div>
//                         <span className="font-semibold text-gray-900">
//                           {formatCurrency(sub.price, sub.currency)}
//                         </span>
//                         <span className="text-xs text-gray-500 ml-1">
//                           /{sub.planType === "Annual" ? "yr" : "mo"}
//                         </span>
//                       </div>
//                     </td>

//                     {/* Status */}
//                     <td className="p-5">
//                       <span
//                         className={`px-2 py-1 text-xs font-medium rounded-lg ${statusColors[sub.status]}`}
//                       >
//                         {sub.status}
//                       </span>
//                       {!sub.autoRenew && sub.status === "Active" && (
//                         <div className="text-xs text-amber-600 mt-1">
//                           Auto-renew off
//                         </div>
//                       )}
//                     </td>

//                     {/* Billing Cycle */}
//                     <td className="p-5">
//                       <div className="text-sm text-gray-700">
//                         {formatDate(sub.startDate)} - {formatDate(sub.endDate)}
//                       </div>
//                     </td>

//                     {/* Next Billing */}
//                     <td className="p-5">
//                       {sub.nextBilling ? (
//                         <div>
//                           <div className="text-sm text-gray-700">
//                             {formatDate(sub.nextBilling)}
//                           </div>
//                           <div
//                             className={`text-xs mt-1 ${
//                               getDaysUntilBilling(sub.nextBilling) === "Overdue"
//                                 ? "text-red-600"
//                                 : "text-gray-500"
//                             }`}
//                           >
//                             {getDaysUntilBilling(sub.nextBilling)}
//                           </div>
//                         </div>
//                       ) : (
//                         <span className="text-sm text-gray-400">—</span>
//                       )}
//                     </td>

//                     {/* Payment Method */}
//                     <td className="p-5">
//                       <div className="flex items-center gap-2">
//                         <HiOutlineCreditCard className="w-4 h-4 text-gray-400" />
//                         <span className="text-sm text-gray-700">
//                           {sub.paymentMethod}
//                         </span>
//                       </div>
//                     </td>

//                     {/* Usage */}
//                     <td className="p-5">
//                       <div className="w-24">
//                         <div className="flex justify-between text-xs mb-1">
//                           <span className="text-gray-600">{sub.usage}%</span>
//                           <span className="text-gray-400">
//                             {sub.usageLimit} limit
//                           </span>
//                         </div>
//                         <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                           <div
//                             className={`h-full rounded-full ${
//                               sub.usage > 80 ? "bg-orange-500" : "bg-blue-500"
//                             }`}
//                             style={{ width: `${sub.usage}%` }}
//                           />
//                         </div>
//                       </div>
//                     </td>

//                     {/* Invoices */}
//                     <td className="p-5">
//                       <div className="text-center">
//                         <span className="text-sm font-medium text-gray-900">
//                           {sub.invoices}
//                         </span>
//                         <button
//                           onClick={() => handleSendInvoice(sub)}
//                           className="block text-xs text-blue-600 hover:text-blue-700 mt-1"
//                         >
//                           View all
//                         </button>
//                       </div>
//                     </td>

//                     {/* Actions */}
//                     <td className="p-5">
//                       <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
//                         <button
//                           onClick={() => handleView(sub)}
//                           className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
//                           title="View Details"
//                         >
//                           <HiOutlineEye className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleEdit(sub)}
//                           className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
//                           title="Edit Subscription"
//                         >
//                           <HiOutlinePencil className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleSendInvoice(sub)}
//                           className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
//                           title="Send Invoice"
//                         >
//                           <HiOutlineMail className="w-4 h-4" />
//                         </button>
//                         {sub.status === "Active" && (
//                           <button
//                             onClick={() => handlePauseSubscription(sub)}
//                             className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
//                             title="Pause Subscription"
//                           >
//                             <HiOutlineBan className="w-4 h-4" />
//                           </button>
//                         )}
//                         <button
//                           onClick={() => handleDelete(sub)}
//                           className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
//                           title="Cancel Subscription"
//                         >
//                           <HiOutlineTrash className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 text-gray-400 hover:text-gray-600">
//                           <HiDotsVertical className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Table Footer with Pagination */}
//           <div className="border-t border-gray-200 bg-gray-50/50 px-5 py-4">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-gray-500">
//                 Showing <span className="font-medium text-gray-900">1</span> to{" "}
//                 <span className="font-medium text-gray-900">
//                   {filteredSubscriptions.length}
//                 </span>{" "}
//                 of <span className="font-medium text-gray-900">1,284</span>{" "}
//                 subscriptions
//               </p>

//               <div className="flex items-center gap-2">
//                 <button className="p-2 border border-gray-200 rounded-lg hover:bg-white hover:border-gray-300 transition-all disabled:opacity-50">
//                   <HiOutlineChevronLeft className="w-4 h-4" />
//                 </button>
//                 <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all">
//                   1
//                 </button>
//                 <button className="px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 rounded-lg transition-all">
//                   2
//                 </button>
//                 <button className="px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 rounded-lg transition-all">
//                   3
//                 </button>
//                 <button className="px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 rounded-lg transition-all">
//                   4
//                 </button>
//                 <span className="text-gray-400">...</span>
//                 <button className="px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 rounded-lg transition-all">
//                   12
//                 </button>
//                 <button className="p-2 border border-gray-200 rounded-lg hover:bg-white hover:border-gray-300 transition-all">
//                   <HiOutlineChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
