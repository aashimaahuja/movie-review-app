"use client";

import { useState } from "react";
import { Movie } from "@/types/movie";
import MovieCard from "@/components/MovieCard";

interface MovieSearchGridProps {
  movies: Movie[];
}

const filterMovies = (movies: Movie[], query: string): Movie[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return movies;
  }

  return movies.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(normalizedQuery);
    const genreMatch = movie.genre.some((genre) =>
      genre.toLowerCase().includes(normalizedQuery)
    );

    return titleMatch || genreMatch;
  });
};

const MovieSearchGrid = ({ movies }: MovieSearchGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = filterMovies(movies, searchQuery);
  const hasActiveSearch = searchQuery.trim().length > 0;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleClearKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClearSearch();
    }
  };

  return (
    <div>
      <div className="max-w-xl mx-auto mb-10">
        <label htmlFor="movie-search" className="sr-only">
          Search movies by title or genre
        </label>
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            id="movie-search"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by movie title or genre..."
            aria-label="Search movies by title or genre"
            className="w-full pl-12 pr-12 py-3 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
          />
          {hasActiveSearch && (
            <button
              type="button"
              onClick={handleClearSearch}
              onKeyDown={handleClearKeyDown}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-gray-600">
            No movies found matching your search
          </p>
          {hasActiveSearch && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded transition-colors duration-200"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearchGrid;
