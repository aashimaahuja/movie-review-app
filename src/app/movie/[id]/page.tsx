import { notFound } from "next/navigation";
import Link from "next/link";
import { movies } from "@/data/movies";
import { reviews } from "@/data/reviews";
import RatingDisplay from "@/components/RatingDisplay";
import ReviewSection from "@/components/ReviewSection";

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movie = movies.find((m) => m.id === params.id);

  if (!movie) {
    notFound();
  }

  const movieReviews = reviews.filter((r) => r.movieId === params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Movies
      </Link>

      {/* Movie Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={movie.poster}
              alt={`Poster for ${movie.title}`}
              className="w-full h-96 md:h-full object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {movie.title}
              </h1>
              <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-lg font-bold">
                {movie.rating}
              </div>
            </div>

            <div className="mb-6">
              <RatingDisplay rating={movie.rating} size="lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-gray-600 font-medium">Year:</span>
                <span className="ml-2 text-gray-800">{movie.year}</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">Director:</span>
                <span className="ml-2 text-gray-800">{movie.director}</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-gray-600 font-medium">Genres:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {movie.genre.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-gray-600 font-medium">Description:</span>
              <p className="mt-2 text-gray-700 leading-relaxed">
                {movie.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewSection reviews={movieReviews} />
    </div>
  );
}
