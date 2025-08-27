"use client";

import { Movie } from "@/types/movie";
import Link from "next/link";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      // Navigation will be handled by the Link component
    }
  };

  return (
    <Link href={`/movie/${movie.id}`}>
      <div
        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100"
        tabIndex={0}
        aria-label={`View details for ${movie.title}`}
        onKeyDown={handleKeyDown}
      >
        {/* Poster Container with Rating Badge */}
        <div className="relative overflow-hidden">
          <div className="aspect-[2/3] w-full">
            <img
              src={movie.poster}
              alt={`Poster for ${movie.title}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2.5 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm bg-opacity-95">
            ⭐ {movie.rating}
          </div>

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {movie.title}
          </h3>

          {/* Year and Director */}
          <div className="space-y-1">
            <p className="text-gray-600 text-sm font-medium">{movie.year}</p>
            <p className="text-gray-500 text-xs">Director: {movie.director}</p>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-1.5">
            {movie.genre.map((genre, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Hover Indicator */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-blue-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Details →
            </span>
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
              <svg
                className="w-3 h-3 text-blue-600 group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
