import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="relative w-36 overflow-hidden rounded-lg shadow-md group transition-transform hover:scale-105"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto object-cover"
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
  );
}
