"use client";

import { ReactNode } from "react";

interface FilterDropdownProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  width?: "sm" | "md" | "lg";
  onClear?: () => void;
  onApply?: () => void;
  clearLabel?: string;
  applyLabel?: string;
  showActions?: boolean;
}

const FilterDropdown = ({
  title,
  onClose,
  children,
  width = "md",
  onClear,
  onApply,
  clearLabel = "Clear All",
  applyLabel = "Apply",
  showActions = true,
}: FilterDropdownProps) => {
  const getWidthClass = () => {
    switch (width) {
      case "sm":
        return "w-48";
      case "md":
        return "w-56";
      case "lg":
        return "w-72";
      default:
        return "w-56";
    }
  };

  return (
    <div
      className={`${getWidthClass()} bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl z-50`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label={`Close ${title}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-2 max-h-48 overflow-y-auto">{children}</div>

        {/* Actions */}
        {showActions && (onClear || onApply) && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="text-gray-600 text-sm font-medium hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                {clearLabel}
              </button>
            )}
            {onApply && (
              <button
                type="button"
                onClick={onApply}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {applyLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
