"use client";

import { useMemo, useState } from "react";
import { Movie } from "@/types/movie";
import MovieCard from "@/components/MovieCard";

interface MovieSearchProps {
  movies: Movie[];
}

const filterMovies = (movies: Movie[], query: string): Movie[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return movies;
  }

  return movies.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(normalizedQuery);
    const matchesGenre = movie.genre.some((genre) =>
      genre.toLowerCase().includes(normalizedQuery)
    );

    return matchesTitle || matchesGenre;
  });
};

const MovieSearch = ({ movies }: MovieSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = useMemo(
    () => filterMovies(movies, searchQuery),
    [movies, searchQuery]
  );

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
    <>
      <div className="max-w-xl mx-auto mb-10">
        <label htmlFor="movie-search" className="sr-only">
          Search movies by title or genre
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="h-5 w-5 text-gray-400"
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
          </div>
          <input
            id="movie-search"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title or genre..."
            aria-label="Search movies by title or genre"
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-12 text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {hasActiveSearch && (
            <button
              type="button"
              onClick={handleClearSearch}
              onKeyDown={handleClearKeyDown}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors duration-200 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            >
              <svg
                className="h-5 w-5"
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

      {hasActiveSearch && filteredMovies.length === 0 ? (
        <div
          className="rounded-lg bg-white p-12 text-center shadow-md"
          role="status"
          aria-live="polite"
        >
          <p className="text-lg font-medium text-gray-800">
            No movies found matching your search
          </p>
          <p className="mt-2 text-gray-500">
            Try a different title or genre keyword.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default MovieSearch;
