import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="relative w-36 overflow-hidden group"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full"
      />
      <div className="absolute inset-0 bg-black/60 text-white text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
        {movie.title}
      </div>
    </Link>
  );
}
