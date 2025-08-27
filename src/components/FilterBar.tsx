"use client";

import { useState, useEffect } from "react";

interface FilterBarProps {
  onGenreFilter: (genres: string[]) => void;
  onYearFilter: (years: string[]) => void;
  onSortChange: (sortOption: string) => void;
  onClearFilters: () => void;
  selectedGenres: string[];
  selectedYears: string[];
  selectedSort: string;
  availableGenres: string[];
  availableYears: number[];
  availableSortOptions: string[];
}

const FilterBar = ({
  onGenreFilter,
  onYearFilter,
  onSortChange,
  onClearFilters,
  selectedGenres,
  selectedYears,
  selectedSort,
  availableGenres,
  availableYears,
  availableSortOptions,
}: FilterBarProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [tempGenres, setTempGenres] = useState<string[]>(selectedGenres);
  const [tempYears, setTempYears] = useState<string[]>(selectedYears);
  const [tempSort, setTempSort] = useState<string>(selectedSort);

  // Update temp states when props change
  useEffect(() => {
    setTempGenres(selectedGenres);
    setTempYears(selectedYears);
    setTempSort(selectedSort);
  }, [selectedGenres, selectedYears, selectedSort]);

  const handleGenreToggle = (genre: string) => {
    setTempGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleYearToggle = (year: string) => {
    setTempYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const handleSortChange = (sortOption: string) => {
    setTempSort(sortOption);
  };

  const handleApplyGenre = () => {
    onGenreFilter(tempGenres);
    setActiveDropdown(null);
  };

  const handleApplyYear = () => {
    onYearFilter(tempYears);
    setActiveDropdown(null);
  };

  const handleApplySort = () => {
    onSortChange(tempSort);
    setActiveDropdown(null);
  };

  const handleClearGenre = () => {
    setTempGenres([]);
    onGenreFilter([]);
  };

  const handleClearYear = () => {
    setTempYears([]);
    onYearFilter([]);
  };

  const handleClearSort = () => {
    setTempSort("rating-desc");
    onSortChange("rating-desc");
  };

  const hasActiveFilters =
    selectedGenres.length > 0 || selectedYears.length > 0;

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".filter-dropdown")) {
        closeDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      {/* Horizontal Filter Buttons */}
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {/* Sort Button */}
        <div className="relative filter-dropdown">
          <button
            onClick={() => toggleDropdown("sort")}
            className={`px-6 py-3 border rounded-2xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedSort !== "rating-desc"
                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white border-purple-500 shadow-lg shadow-purple-500/25"
                : "bg-white/80 backdrop-blur-sm border-gray-200 text-gray-700 hover:bg-white hover:shadow-lg"
            }`}
          >
            <span>SORT</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                activeDropdown === "sort" ? "rotate-180" : ""
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

          {/* Sort Dropdown Modal */}
          {activeDropdown === "sort" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl z-50">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Sort Options
                  </h3>
                  <button
                    onClick={closeDropdowns}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
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

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableSortOptions.map((sortOption) => (
                    <label
                      key={sortOption}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-xl transition-colors duration-200"
                    >
                      <input
                        type="radio"
                        name="sort"
                        checked={tempSort === sortOption}
                        onChange={() => handleSortChange(sortOption)}
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {sortOption === "rating-desc" && "Highest Rating First"}
                        {sortOption === "rating-asc" && "Lowest Rating First"}
                        {sortOption === "year-desc" && "Newest First"}
                        {sortOption === "year-asc" && "Oldest First"}
                        {sortOption === "title-asc" && "Title A-Z"}
                        {sortOption === "title-desc" && "Title Z-A"}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                  <button
                    onClick={handleClearSort}
                    className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors duration-200"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApplySort}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl text-sm font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Genre Filter Button */}
        <div className="relative filter-dropdown">
          <button
            onClick={() => toggleDropdown("genre")}
            className={`px-6 py-3 border rounded-2xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedGenres.length > 0
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                : "bg-white/80 backdrop-blur-sm border-gray-200 text-gray-700 hover:bg-white hover:shadow-lg"
            }`}
          >
            <span>
              GENRE {selectedGenres.length > 0 && `(${selectedGenres.length})`}
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                activeDropdown === "genre" ? "rotate-180" : ""
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

          {/* Genre Dropdown Modal */}
          {activeDropdown === "genre" && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl z-50">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Genre Filter
                  </h3>
                  <button
                    onClick={closeDropdowns}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
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

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableGenres.map((genre) => (
                    <label
                      key={genre}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-xl transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={tempGenres.includes(genre)}
                        onChange={() => handleGenreToggle(genre)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {genre}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                  <button
                    onClick={handleClearGenre}
                    className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-200"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleApplyGenre}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Year Filter Button */}
        <div className="relative filter-dropdown">
          <button
            onClick={() => toggleDropdown("year")}
            className={`px-6 py-3 border rounded-2xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedYears.length > 0
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500 shadow-lg shadow-green-500/25"
                : "bg-white/80 backdrop-blur-sm border-gray-200 text-gray-700 hover:bg-white hover:shadow-lg"
            }`}
          >
            <span>
              YEAR {selectedYears.length > 0 && `(${selectedYears.length})`}
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                activeDropdown === "year" ? "rotate-180" : ""
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

          {/* Year Dropdown Modal */}
          {activeDropdown === "year" && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl z-50">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Year Filter
                  </h3>
                  <button
                    onClick={closeDropdowns}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
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

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableYears.map((year) => (
                    <label
                      key={year}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-xl transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={tempYears.includes(year.toString())}
                        onChange={() => handleYearToggle(year.toString())}
                        className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 focus:ring-2"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {year}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                  <button
                    onClick={handleClearYear}
                    className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors duration-200"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleApplyYear}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clear All Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl text-sm font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-gray-700 font-medium">Active filters:</span>
            {selectedGenres.length > 0 && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                Genres: {selectedGenres.join(", ")}
              </span>
            )}
            {selectedYears.length > 0 && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                Years: {selectedYears.join(", ")}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
