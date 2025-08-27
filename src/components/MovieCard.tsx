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
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
        tabIndex={0}
        aria-label={`View details for ${movie.title}`}
        onKeyDown={handleKeyDown}
      >
        <div className="relative">
          <img
            src={movie.poster}
            alt={`Poster for ${movie.title}`}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold">
            {movie.rating}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {movie.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{movie.year}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {movie.genre.map((genre, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
          <p className="text-gray-500 text-sm">Director: {movie.director}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
