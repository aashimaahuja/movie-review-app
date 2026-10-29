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
    hasActiveFilters,
    filteredMovies,
    availableGenres,
    handleSearch,
    handleGenreFilter,
    handleClearFilters,
  } = useMovieFilters();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-6">
            Movie Review App
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
            Discover and review your favorite movies with our curated collection
            of cinematic masterpieces
          </p>

          <SearchBar value={searchQuery} onSearch={handleSearch} />
        </div>

        <div className="mb-8">
          <FilterBar
            onGenreFilter={handleGenreFilter}
            onClearFilters={handleClearFilters}
            selectedGenres={selectedGenres}
            availableGenres={availableGenres}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {hasActiveFilters && (
          <div className="text-center mb-8" aria-live="polite">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
              <p className="text-gray-700 font-medium">
                {filteredMovies.length === 0 ? (
                  <span className="text-red-500">
                    No movies match your current filters. Try a different title
                    or genre.
                  </span>
                ) : (
                  <span className="text-blue-600">
                    Found {filteredMovies.length} movie
                    {filteredMovies.length !== 1 ? "s" : ""}
                    {searchQuery.trim() && ` for "${searchQuery.trim()}"`}
                    {selectedGenres.length > 0 &&
                      ` in ${selectedGenres.join(", ")}`}
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 mb-12"
            role="status"
            aria-live="polite"
          >
            <p className="text-lg text-gray-600">
              No movies found. Clear your filters to see the full catalog.
            </p>
          </div>
        )}

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
