"use client";

import { ReactNode } from "react";

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  isOpen: boolean;
  count?: number;
  onClick: () => void;
  children?: ReactNode;
  activeColor?: "blue" | "green" | "purple";
}

const FilterButton = ({
  label,
  isActive,
  isOpen,
  count,
  onClick,
  children,
  activeColor = "blue",
}: FilterButtonProps) => {
  const getActiveStyles = () => {
    switch (activeColor) {
      case "blue":
        return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 shadow-lg shadow-blue-500/25";
      case "green":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500 shadow-lg shadow-green-500/25";
      case "purple":
        return "bg-gradient-to-r from-purple-500 to-pink-600 text-white border-purple-500 shadow-lg shadow-purple-500/25";
      default:
        return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 shadow-lg shadow-blue-500/25";
    }
  };

  const getActiveCountColor = () => {
    switch (activeColor) {
      case "blue":
        return "text-blue-100";
      case "green":
        return "text-green-100";
      case "purple":
        return "text-purple-100";
      default:
        return "text-blue-100";
    }
  };

  return (
    <div className="relative filter-dropdown">
      <button
        onClick={onClick}
        className={`px-6 py-3 border rounded-2xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
          isActive
            ? getActiveStyles()
            : "bg-white/80 backdrop-blur-sm border-gray-200 text-gray-700 hover:bg-white hover:shadow-lg"
        }`}
      >
        <span>
          {label} {count && count > 0 && `(${count})`}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Content */}
      {children && (
        <div className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl z-50">
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
