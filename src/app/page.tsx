"use client";

import { useState, useMemo } from "react";
import { movies } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("rating-desc");

  const availableGenres = useMemo(() => {
    const genres = movies.flatMap((movie) => movie.genre);
    return Array.from(new Set(genres)).sort();
  }, []);

  const availableYears = useMemo(() => {
    const years = movies.map((movie) => movie.year);
    return Array.from(new Set(years)).sort((a, b) => b - a); // Sort descending
  }, []);

  const availableSortOptions = useMemo(
    () => [
      "rating-desc",
      "rating-asc",
      "year-desc",
      "year-asc",
      "title-asc",
      "title-desc",
    ],
    []
  );

  const filteredMovies = useMemo(() => {
    let filtered = movies;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((movie) =>
        movie.genre.some((genre) => selectedGenres.includes(genre))
      );
    }

    // Apply year filter
    if (selectedYears.length > 0) {
      filtered = filtered.filter((movie) =>
        selectedYears.includes(movie.year.toString())
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case "rating-desc":
          return b.rating - a.rating; // Highest rating first
        case "rating-asc":
          return a.rating - b.rating; // Lowest rating first
        case "year-desc":
          return b.year - a.year; // Newest first
        case "year-asc":
          return a.year - b.year; // Oldest first
        case "title-asc":
          return a.title.localeCompare(b.title); // A-Z
        case "title-desc":
          return b.title.localeCompare(a.title); // Z-A
        default:
          return b.rating - a.rating; // Default to highest rating first
      }
    });

    return sorted;
  }, [searchQuery, selectedGenres, selectedYears, selectedSort]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleGenreFilter = (genres: string[]) => {
    setSelectedGenres(genres);
  };

  const handleYearFilter = (years: string[]) => {
    setSelectedYears(years);
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSelectedYears([]);
    setSelectedSort("rating-desc");
  };

  const hasActiveFilters =
    selectedGenres.length > 0 || selectedYears.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-6">
            Movie Review App
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
            Discover and review your favorite movies with our curated collection
            of cinematic masterpieces
          </p>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar
            onGenreFilter={handleGenreFilter}
            onYearFilter={handleYearFilter}
            onSortChange={handleSortChange}
            onClearFilters={handleClearFilters}
            selectedGenres={selectedGenres}
            selectedYears={selectedYears}
            selectedSort={selectedSort}
            availableGenres={availableGenres}
            availableYears={availableYears}
            availableSortOptions={availableSortOptions}
          />
        </div>

        {/* Search and Filter Results Info */}
        {(searchQuery || hasActiveFilters) && (
          <div className="text-center mb-8">
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
              <p className="text-gray-700 font-medium">
                {filteredMovies.length === 0 ? (
                  <span className="text-red-500">
                    No movies found for the selected criteria
                  </span>
                ) : (
                  <span className="text-blue-600">
                    Found {filteredMovies.length} movie
                    {filteredMovies.length !== 1 ? "s" : ""}
                    {searchQuery && ` for "${searchQuery}"`}
                    {hasActiveFilters && " with selected filters"}
                    {selectedSort !== "rating-desc" &&
                      ` • Sorted by ${
                        selectedSort === "rating-asc"
                          ? "lowest rating first"
                          : selectedSort === "year-desc"
                          ? "newest first"
                          : selectedSort === "year-asc"
                          ? "oldest first"
                          : selectedSort === "title-asc"
                          ? "title A-Z"
                          : selectedSort === "title-desc"
                          ? "title Z-A"
                          : "highest rating first"
                      }`}
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            {filteredMovies.length === movies.length
              ? `${movies.length} movies available • Explore and discover your next favorite film`
              : `Showing ${filteredMovies.length} of ${movies.length} movies • Clear search and filters to see all movies`}
          </p>
        </div>
      </div>
    </div>
  );
}
