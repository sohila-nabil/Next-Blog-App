// components/Admin/DynamicTable.js
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Badge,
} from "flowbite-react";
import Image from "next/image";
import { HiPencil, HiTrash, HiEye } from "react-icons/hi";

 function DynamicTable({
  columns, // Array of column definitions
  data, // Array of data objects
  actions = true, // Whether to show action buttons
  onView, // View action handler
  onEdit, // Edit action handler
  onDelete, // Delete action handler
  isLoading = false,
  emptyMessage = "No data found",
}) {
  // Function to render cell content based on column type
  const renderCellContent = (item, column) => {
    const value = item[column.key];

    // Handle different column types
    switch (column.type) {
    //   case "image":
    //     return (
    //       <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden">
    //         {value ? (
    //           <Image
    //             height={100}
    //             width={100}
    //             src={value}
    //             alt={item.title || "image"}
    //             className="w-full h-full object-cover"
    //           />
    //         ) : (
    //           <div className="w-full h-full flex items-center justify-center text-gray-400">
    //             📷
    //           </div>
    //         )}
    //       </div>
    //     );

      case "badge":
        return (
          <Badge color={column.color || "info"} className="w-fit">
            {value || "-"}
          </Badge>
        );

      case "status":
        const statusColor =
          {
            published: "success",
            draft: "warning",
            scheduled: "info",
            active: "success",
            inactive: "failure",
            pending: "warning",
          }[value?.toLowerCase()] || "gray";

        return (
          <Badge color={statusColor} className="w-fit">
            {value || "-"}
          </Badge>
        );

      case "date":
        return value
          ? new Date(value).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "-";

      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: column.currency || "USD",
        }).format(value || 0);

      case "boolean":
        return value ? "✓" : "✗";

      default:
        // For regular text, truncate if needed
        if (column.truncate) {
          return (
            <div className="truncate max-w-xs" title={value}>
              {value || "-"}
            </div>
          );
        }
        return value || "-";
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        {/* Table Head */}
        <TableHead>
          <TableRow className="bg-gray-50">
            {columns.map((column, index) => (
              <TableHeadCell
                key={index}
                className={`font-semibold text-gray-700 ${column.className || ""}`}
                style={column.width ? { width: column.width } : {}}
              >
                {column.label}
              </TableHeadCell>
            ))}
            {actions && (
              <TableHeadCell className="font-semibold text-gray-700">
                Actions
              </TableHeadCell>
            )}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody className="divide-y">
          {data && data.length > 0 ? (
            data.map((item, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="bg-white hover:bg-gray-50 transition-colors"
              >
                {/* Data Columns */}
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className="text-gray-900">
                    {renderCellContent(item, column)}
                  </TableCell>
                ))}

                {/* Action Buttons */}
                {actions && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {onView && (
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                          onClick={() => onView(item)}
                        >
                          <HiEye className="w-4 h-4" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                          onClick={() => onEdit(item)}
                        >
                          <HiPencil className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                          onClick={() => onDelete(item)}
                        >
                          <HiTrash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            // Empty State
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-12"
              >
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {emptyMessage}
                  </h3>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
export default DynamicTable