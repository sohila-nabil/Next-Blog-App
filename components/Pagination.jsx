import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function Pagination({ currentPage, totalPages, onPageChange }) {

  const visiblePages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (p) => p > 0 && p <= totalPages,
  );

  return (
    <div className="flex items-center gap-2">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border rounded-lg disabled:opacity-50"
      >
        <HiOutlineChevronLeft />
      </button>

      {/* Pages */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1.5 rounded-lg text-sm ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border rounded-lg disabled:opacity-50"
      >
        <HiOutlineChevronRight />
      </button>
    </div>
  );
}
