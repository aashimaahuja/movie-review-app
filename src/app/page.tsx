import { movies } from "@/data/movies";
import MovieSearchGrid from "@/components/MovieSearchGrid";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Movie Review App
        </h1>
        <p className="text-xl text-gray-600">
          Discover and review your favorite movies
        </p>
      </div>

      <MovieSearchGrid movies={movies} />
    </div>
  );
}
