# Testing Guide

This project uses Jest and React Testing Library for comprehensive testing of the `useMovieFilters` hook.

## Test Coverage

The test suite covers:

### 1. Initial State

- Default values for all state variables
- Initial computed values (available genres, years, sort options)
- Default sorting behavior

### 2. Search Functionality

- Case-insensitive search
- Whitespace handling
- Empty search results
- Search query clearing

### 3. Genre Filtering

- Single genre selection
- Multiple genre selection
- OR logic (movies with ANY selected genre)
- Filter clearing

### 4. Year Filtering

- Single year selection
- Multiple year selection
- Filter clearing

### 5. Sorting Functionality

- Rating (highest/lowest first)
- Year (newest/oldest first)
- Title (A-Z/Z-A)
- Default sorting behavior

### 6. Combined Filtering

- Search + Genre + Year filters
- Filters + Sorting combinations
- Sort order maintenance during filtering

### 7. Clear Filters

- Reset all filters to default
- Preserve search query
- Reset sorting to default

### 8. Edge Cases

- Empty movies array
- Missing movie properties
- Long search queries
- Special characters

## Running Tests

### Install Dependencies

```bash
npm install
```

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Tests for CI

```bash
npm run test:ci
```

## Test Structure

```
src/hooks/__tests__/
└── useMovieFilters.test.ts
```

## Test Data

The tests use a mock dataset of 5 movies with various:

- Genres: Action, Crime, Drama, Sci-Fi, Thriller
- Years: 1994, 1999, 2008, 2010
- Ratings: 8.8, 8.8, 8.9, 9.0, 9.3

## Coverage Thresholds

The project aims for 80% coverage across:

- Branches
- Functions
- Lines
- Statements

## Mocking Strategy

- **Movies Data**: Mocked to ensure consistent test results
- **Next.js Components**: Mocked for isolated hook testing
- **Browser APIs**: Mocked for JSDOM compatibility

## Writing New Tests

When adding new functionality to the hook:

1. **Add test cases** to the appropriate describe block
2. **Test edge cases** and error conditions
3. **Verify state changes** using `act()` wrapper
4. **Check computed values** after state changes
5. **Test combinations** of multiple features

## Example Test Case

```typescript
it("should filter movies by search query", () => {
  const { result } = renderHook(() => useMovieFilters());

  act(() => {
    result.current.handleSearch("inception");
  });

  expect(result.current.searchQuery).toBe("inception");
  expect(result.current.filteredMovies).toHaveLength(1);
  expect(result.current.filteredMovies[0].title).toBe("Inception");
});
```

## Best Practices

- Use descriptive test names
- Test one behavior per test case
- Use `act()` for state changes
- Verify both state and computed values
- Test edge cases and error conditions
- Keep tests focused and readable
