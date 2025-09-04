import { useState, useMemo } from "react";
import { movies } from "@/data/movies";

export const useMovieFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("rating-desc");
  const [selectedRating, setSelectedRating] = useState<string[]>([]);
  // Get unique genres and years from movies data
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

  const availableRatings = useMemo(() => {
    const ratings = movies.map((movie) => movie.rating);
    return Array.from(new Set(ratings)).sort((a, b) => b - a); // Sort descending
  }, []);

  // Filter and sort movies based on search query, filters, and sort option
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

    // Apply rating filter
    if (selectedRating.length > 0) {
      filtered = filtered.filter((movie) =>
        selectedRating.includes(movie.rating.toString())
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
  }, [searchQuery, selectedGenres, selectedYears, selectedSort, selectedRating]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleGenreFilter = (genres: string[]) => {
    setSelectedGenres(genres);
  };

  const handleYearFilter = (years: string[]) => {
    setSelectedYears(years);
  };

  const handleRatingFilter = (ratings: string[]) => {
    setSelectedRating(ratings);
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSelectedYears([]);
    setSelectedRating([]);
    setSelectedSort("rating-desc");
  };

  const hasActiveFilters =
    selectedGenres.length > 0 || selectedYears.length > 0;

  return {
    // State
    searchQuery,
    selectedGenres,
    selectedYears,
    selectedSort,
    selectedRating,
    hasActiveFilters,

    // Computed values
    filteredMovies,
    availableGenres,
    availableYears,
    availableSortOptions,
    availableRatings,
    // Handlers
    setSearchQuery,
    handleSearch,
    handleGenreFilter,
    handleYearFilter,
    handleRatingFilter,
    handleSortChange,
    handleClearFilters,
  };
};
