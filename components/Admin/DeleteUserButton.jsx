// components/DeleteUserButton.jsx
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

export default function DeleteUserButton({ userId }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await axios.delete(`/api/user/delete/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/admin/users");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all"
    >
      <HiOutlineTrash className="w-4 h-4" />
      Delete User
    </button>
  );
}
