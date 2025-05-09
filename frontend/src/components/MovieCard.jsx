import React from "react";
import { Link } from "react-router-dom";
import { HeartOff } from "lucide-react";
import { preloadMovieData } from "../utils/moviePreloadCache";
import { fetchMovieDetails, fetchMovieCredits } from "../services/tmdbService";

export default function MovieCard({ movie, onRemove }) {
  const handleHover = () => {
    preloadMovieData(movie.id, fetchMovieDetails, fetchMovieCredits);
  };

  return (
    <div
      onMouseEnter={handleHover}
      className="relative w-full aspect-[2/3] overflow-hidden rounded-lg shadow-md group transition-transform hover:scale-105"
    >
      {onRemove && (
        <button
          onClick={() => onRemove(movie.id)}
          className="absolute top-1 right-1 z-10 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
          aria-label="Fjern fra ønskeliste"
        >
          <HeartOff size={16} />
        </button>
      )}

      <Link to={`/movies/${movie.id}`}>
        <img
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto object-cover rounded-lg"
        />

        <div className="absolute inset-0 bg-black/70 text-white flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out p-2">
          <p className="text-sm font-semibold px-2 leading-tight">
            {movie.title}
          </p>
          <p className="text-xs mt-1 bg-yellow-400 text-black px-2 py-0.5 rounded font-bold shadow-sm">
            {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </Link>
    </div>
  );
}
