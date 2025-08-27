"use client";

import { useState, useEffect, useCallback } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  onSearch,
  placeholder = "Search movies...",
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = useCallback(() => {
    setSearchQuery("");
    onSearch("");
  }, [onSearch]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full pl-12 pr-20 py-3 bg-white border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
            aria-label="Search movies by name"
          />

          {/* Clear Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-16 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Clear search"
            >
              <svg
                className="h-5 w-5"
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
          )}

          {/* Search Button */}
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-r-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Search"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
