"use client";

import { useState, useEffect } from "react";
import FilterButton from "./FilterButton";
import FilterDropdown from "./FilterDropdown";
import FilterCheckbox from "./FilterCheckbox";

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
        <FilterButton
          label="SORT"
          isActive={selectedSort !== "rating-desc"}
          isOpen={activeDropdown === "sort"}
          onClick={() => toggleDropdown("sort")}
          activeColor="purple"
        >
          {activeDropdown === "sort" && (
            <FilterDropdown
              title="Sort Options"
              onClose={closeDropdowns}
              onClear={handleClearSort}
              onApply={handleApplySort}
              clearLabel="Reset"
              width="sm"
            >
              {availableSortOptions.map((sortOption) => (
                <FilterCheckbox
                  key={sortOption}
                  id={`sort-${sortOption}`}
                  label={
                    sortOption === "rating-desc"
                      ? "Highest Rating First"
                      : sortOption === "rating-asc"
                      ? "Lowest Rating First"
                      : sortOption === "year-desc"
                      ? "Newest First"
                      : sortOption === "year-asc"
                      ? "Oldest First"
                      : sortOption === "title-asc"
                      ? "Title A-Z"
                      : sortOption === "title-desc"
                      ? "Title Z-A"
                      : "Highest Rating First"
                  }
                  checked={tempSort === sortOption}
                  onChange={() => handleSortChange(sortOption)}
                  type="radio"
                  name="sort"
                  color="purple"
                />
              ))}
            </FilterDropdown>
          )}
        </FilterButton>

        {/* Genre Filter Button */}
        <FilterButton
          label="GENRE"
          isActive={selectedGenres.length > 0}
          isOpen={activeDropdown === "genre"}
          count={selectedGenres.length}
          onClick={() => toggleDropdown("genre")}
          activeColor="blue"
        >
          {activeDropdown === "genre" && (
            <FilterDropdown
              title="Genre Filter"
              onClose={closeDropdowns}
              onClear={handleClearGenre}
              onApply={handleApplyGenre}
              width="lg"
            >
              {availableGenres.map((genre) => (
                <FilterCheckbox
                  key={genre}
                  id={`genre-${genre}`}
                  label={genre}
                  checked={tempGenres.includes(genre)}
                  onChange={() => handleGenreToggle(genre)}
                  type="checkbox"
                  color="blue"
                />
              ))}
            </FilterDropdown>
          )}
        </FilterButton>

        {/* Year Filter Button */}
        <FilterButton
          label="YEAR"
          isActive={selectedYears.length > 0}
          isOpen={activeDropdown === "year"}
          count={selectedYears.length}
          onClick={() => toggleDropdown("year")}
          activeColor="green"
        >
          {activeDropdown === "year" && (
            <FilterDropdown
              title="Year Filter"
              onClose={closeDropdowns}
              onClear={handleClearYear}
              onApply={handleApplyYear}
              width="md"
            >
              {availableYears.map((year) => (
                <FilterCheckbox
                  key={year}
                  id={`year-${year}`}
                  label={year.toString()}
                  checked={tempYears.includes(year.toString())}
                  onChange={() => handleYearToggle(year.toString())}
                  type="checkbox"
                  color="green"
                />
              ))}
            </FilterDropdown>
          )}
        </FilterButton>

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
