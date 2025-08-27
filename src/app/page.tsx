"use client";

import { useState, useMemo } from "react";
import { movies } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter movies based on search query
  const filteredMovies = useMemo(() => {
    if (!searchQuery.trim()) {
      return movies;
    }

    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-6">
            Movie Review App
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Discover and review your favorite movies with our curated collection
            of cinematic masterpieces
          </p>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="text-center mb-8">
            <p className="text-gray-600">
              {filteredMovies.length === 0 ? (
                <span className="text-red-500 font-medium">
                  No movies found for "{searchQuery}"
                </span>
              ) : (
                <span className="text-blue-600 font-medium">
                  Found {filteredMovies.length} movie
                  {filteredMovies.length !== 1 ? "s" : ""} for "{searchQuery}"
                </span>
              )}
            </p>
          </div>
        )}

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            {filteredMovies.length === movies.length
              ? `${movies.length} movies available • Explore and discover your next favorite film`
              : `Showing ${filteredMovies.length} of ${movies.length} movies • Clear search to see all movies`}
          </p>
        </div>
      </div>
    </div>
  );
}
