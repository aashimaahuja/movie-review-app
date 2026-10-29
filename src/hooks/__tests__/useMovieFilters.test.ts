import { renderHook, act } from "@testing-library/react";
import { useMovieFilters } from "@/hooks/useMovieFilters";

jest.mock("@/data/movies", () => ({
  movies: [
    {
      id: "1",
      title: "Inception",
      year: 2010,
      genre: ["Sci-Fi", "Action", "Thriller"],
      director: "Christopher Nolan",
      poster: "test-poster-1.jpg",
      description:
        "A thief who steals corporate secrets through dream-sharing technology.",
      rating: 8.8,
    },
    {
      id: "2",
      title: "The Shawshank Redemption",
      year: 1994,
      genre: ["Drama"],
      director: "Frank Darabont",
      poster: "test-poster-2.jpg",
      description: "Two imprisoned men bond over years.",
      rating: 9.3,
    },
    {
      id: "3",
      title: "Pulp Fiction",
      year: 1994,
      genre: ["Crime", "Drama"],
      director: "Quentin Tarantino",
      poster: "test-poster-3.jpg",
      description: "The lives of two mob hitmen intertwine.",
      rating: 8.9,
    },
    {
      id: "4",
      title: "The Dark Knight",
      year: 2008,
      genre: ["Action", "Crime", "Drama"],
      director: "Christopher Nolan",
      poster: "test-poster-4.jpg",
      description: "Batman faces the Joker.",
      rating: 9.0,
    },
    {
      id: "5",
      title: "Fight Club",
      year: 1999,
      genre: ["Drama"],
      director: "David Fincher",
      poster: "test-poster-5.jpg",
      description: "An underground fight club evolves.",
      rating: 8.8,
    },
  ],
}));

describe("useMovieFilters", () => {
  describe("Initial State", () => {
    it("should initialize with default values", () => {
      const { result } = renderHook(() => useMovieFilters());

      expect(result.current.searchQuery).toBe("");
      expect(result.current.selectedGenres).toEqual([]);
      expect(result.current.hasActiveFilters).toBe(false);
      expect(result.current.filteredMovies).toHaveLength(5);
      expect(result.current.availableGenres).toEqual([
        "Action",
        "Crime",
        "Drama",
        "Sci-Fi",
        "Thriller",
      ]);
    });
  });

  describe("Search Functionality", () => {
    it("should filter movies by search query", () => {
      const { result } = renderHook(() => useMovieFilters());

      act(() => {
        result.current.handleSearch("inception");
      });

      expect(result.current.searchQuery).toBe("inception");
      expect(result.current.filteredMovies).toHaveLength(1);
      expect(result.current.filteredMovies[0].title).toBe("Inception");
      expect(result.current.hasActiveFilters).toBe(true);
    });

    it("should filter movies case-insensitively", () => {
      const { result } = renderHook(() => useMovieFilters());

      act(() => {
        result.current.handleSearch("INCEPTION");
      });

      expect(result.current.filteredMovies).toHaveLength(1);
      expect(result.current.filteredMovies[0].title).toBe("Inception");
    });

    it("should match partial titles", () => {
      const { result } = renderHook(() => useMovieFilters());

      act(() => {
        result.current.handleSearch("dark");
      });

      expect(result.current.filteredMovies).toHaveLength(1);
      expect(result.current.filteredMovies[0].title).toBe("The Dark Knight");
    });

    it("should return empty array when no movies match search", () => {
      const { result } = renderHook(() => useMovieFilters());

      act(() => {
        result.current.handleSearch("nonexistent");
      });

      expect(result.current.filteredMovies).toHaveLength(0);
    });

    it("should trim whitespace in search query", () => {
      const { result } = renderHook(() => useMovieFilters());

      act(() => {
        result.current.handleSearch("  inception  ");
      });

      expect(result.current.filteredMovies).toHaveLength(1);
      expect(result.current.filteredMovies[0].title).toBe("Inception");
    });

    it("should return all movies when search query is cleared", () => {
      const { result } = renderHook(() => useMovieFilters());

      act(() => {
        result.current.handleSearch("inception");
      });

      expect(result.current.filteredMovies).toHaveLength(1);

      act(() => {
        result.current.handleSearch("");
      });

      expect(result.current.filteredMovies).toHaveLength(5);
      expect(result.current.hasActiveFilters).toBe(false);
    });
  });

  describe("Genre Filtering", () => {
    it("should filter movies by single genre", () => {
      const { result } = renderHook(() => useMovieFilters());

      act(() => {
        result.current.handleGenreFilter(["Action"]);
      });

      expect(result.current.selectedGenres).toEqual(["Action"]);
      expect(result.current.filteredMovies).toHaveLength(2);
      expect(result.current.hasActiveFilters).toBe(true);
    });

    it("should return movies that include any selected genre", () => {
      const { result } = renderHook(() => useMovieFilters());

      act(() => {
        result.current.handleGenreFilter(["Sci-Fi", "Crime"]);
      });

      expect(result.current.filteredMovies).toHaveLength(3);
    });

    it("should return empty array when no movies match selected genres", () => {
      const { result } = renderHook(() => useMovieFilters());

      act(() => {
        result.current.handleGenreFilter(["Horror"]);
      });

      expect(result.current.filteredMovies).toHaveLength(0);
    });

    it("should return all movies when genre filter is cleared", () => {
      const { result } = renderHook(() => useMovieFilters());

      act(() => {
        result.current.handleGenreFilter(["Action"]);
      });

      act(() => {
        result.current.handleGenreFilter([]);
      });

      expect(result.current.filteredMovies).toHaveLength(5);
      expect(result.current.hasActiveFilters).toBe(false);
    });
  });

  describe("Combined Filtering", () => {
    it("should apply search and genre filters with AND logic", () => {
      const { result } = renderHook(() => useMovieFilters());

      act(() => {
        result.current.handleSearch("the");
        result.current.handleGenreFilter(["Action"]);
      });

      expect(result.current.filteredMovies).toHaveLength(1);
      expect(result.current.filteredMovies[0].title).toBe("The Dark Knight");
      expect(result.current.hasActiveFilters).toBe(true);
    });

    it("should return empty results when combined filters match nothing", () => {
      const { result } = renderHook(() => useMovieFilters());

      act(() => {
        result.current.handleSearch("inception");
        result.current.handleGenreFilter(["Drama"]);
      });

      expect(result.current.filteredMovies).toHaveLength(0);
    });
  });

  describe("Clear Filters", () => {
    it("should clear search and genres and restore the full list", () => {
      const { result } = renderHook(() => useMovieFilters());

      act(() => {
        result.current.handleSearch("test");
        result.current.handleGenreFilter(["Action"]);
      });

      act(() => {
        result.current.handleClearFilters();
      });

      expect(result.current.searchQuery).toBe("");
      expect(result.current.selectedGenres).toEqual([]);
      expect(result.current.hasActiveFilters).toBe(false);
      expect(result.current.filteredMovies).toHaveLength(5);
    });
  });
});
