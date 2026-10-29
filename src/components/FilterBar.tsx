"use client";

import { useState, useEffect } from "react";
import FilterButton from "@/components/FilterButton";
import FilterDropdown from "@/components/FilterDropdown";
import FilterCheckbox from "@/components/FilterCheckbox";

type FilterBarProps = {
  onGenreFilter: (genres: string[]) => void;
  onClearFilters: () => void;
  selectedGenres: string[];
  availableGenres: string[];
  hasActiveFilters: boolean;
};

const FilterBar = ({
  onGenreFilter,
  onClearFilters,
  selectedGenres,
  availableGenres,
  hasActiveFilters,
}: FilterBarProps) => {
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [tempGenres, setTempGenres] = useState<string[]>(selectedGenres);

  useEffect(() => {
    setTempGenres(selectedGenres);
  }, [selectedGenres]);

  const handleGenreToggle = (genre: string) => {
    setTempGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleApplyGenre = () => {
    onGenreFilter(tempGenres);
    setIsGenreOpen(false);
  };

  const handleClearGenre = () => {
    setTempGenres([]);
    onGenreFilter([]);
  };

  const handleToggleGenreDropdown = () => {
    setIsGenreOpen((prev) => !prev);
  };

  const handleCloseDropdown = () => {
    setIsGenreOpen(false);
    setTempGenres(selectedGenres);
  };

  const handleClearAll = () => {
    setTempGenres([]);
    setIsGenreOpen(false);
    onClearFilters();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".filter-dropdown")) {
        setIsGenreOpen(false);
        setTempGenres(selectedGenres);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsGenreOpen(false);
        setTempGenres(selectedGenres);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedGenres]);

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <div
        className="flex items-center gap-4 flex-wrap justify-center"
        role="group"
        aria-label="Movie filters"
      >
        <FilterButton
          label="Genre"
          isActive={selectedGenres.length > 0}
          isOpen={isGenreOpen}
          count={selectedGenres.length}
          onClick={handleToggleGenreDropdown}
          activeColor="blue"
          ariaLabel="Filter movies by genre"
        >
          {isGenreOpen && (
            <FilterDropdown
              title="Genre Filter"
              onClose={handleCloseDropdown}
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

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl text-sm font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        )}
      </div>

      {selectedGenres.length > 0 && (
        <div className="mt-6 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
            <span className="text-gray-700 font-medium">Active genres:</span>
            {selectedGenres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
