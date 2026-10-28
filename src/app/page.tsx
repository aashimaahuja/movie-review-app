"use client";

import { useMovieFilters } from "@/hooks/useMovieFilters";
import { movies } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";

export default function Home() {
  const {
    searchQuery,
    selectedGenres,
    selectedYears,
    selectedSort,
    selectedRating,
    hasActiveFilters,
    filteredMovies,
    availableGenres,
    availableYears,
    availableSortOptions,
    handleSearch,
    handleGenreFilter,
    handleYearFilter,
    handleRatingFilter,
    handleSortChange,
    handleClearFilters,
    availableRatings,
  } = useMovieFilters();

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
          <SearchBar value={searchQuery} onSearch={handleSearch} />
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar
            onGenreFilter={handleGenreFilter}
            onYearFilter={handleYearFilter}
            onRatingFilter={handleRatingFilter}
            onSortChange={handleSortChange}
            onClearFilters={handleClearFilters}
            selectedGenres={selectedGenres}
            selectedYears={selectedYears}
            selectedSort={selectedSort}
            selectedRating={selectedRating}
            availableGenres={availableGenres}
            availableYears={availableYears}
            availableRatings={availableRatings}
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

        {/* Movies Grid / Empty State */}
        {filteredMovies.length === 0 ? (
          <div
            className="mb-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/60 px-6 py-16 text-center"
            role="status"
            aria-live="polite"
          >
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">
              No movies found
            </h2>
            <p className="mb-6 max-w-md text-gray-600">
              No movies match your current name and genre filters. Try a
              different search or clear your filters to see the full list.
            </p>
            {(searchQuery || hasActiveFilters) && (
              <button
                type="button"
                onClick={() => {
                  handleSearch("");
                  handleClearFilters();
                }}
                aria-label="Clear search and filters"
                className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
              >
                Clear search and filters
              </button>
            )}
          </div>
        ) : (
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

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
