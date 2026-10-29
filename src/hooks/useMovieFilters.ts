import { useState, useMemo, useCallback } from "react";
import { movies } from "@/data/movies";

export const useMovieFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const availableGenres = useMemo(() => {
    const genres = movies.flatMap((movie) => movie.genre);
    return Array.from(new Set(genres)).sort();
  }, []);

  const filteredMovies = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return movies.filter((movie) => {
      const matchesTitle =
        !normalizedQuery ||
        movie.title.toLowerCase().includes(normalizedQuery);

      if (!matchesTitle) {
        return false;
      }

      if (selectedGenres.length === 0) {
        return true;
      }

      return movie.genre.some((genre) => selectedGenres.includes(genre));
    });
  }, [searchQuery, selectedGenres]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleGenreFilter = useCallback((genres: string[]) => {
    setSelectedGenres(genres);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedGenres([]);
  }, []);

  const hasActiveFilters =
    searchQuery.trim().length > 0 || selectedGenres.length > 0;

  return {
    searchQuery,
    selectedGenres,
    hasActiveFilters,
    filteredMovies,
    availableGenres,
    handleSearch,
    handleGenreFilter,
    handleClearFilters,
  };
};
