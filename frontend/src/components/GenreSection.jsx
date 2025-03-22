import React from "react";
import { Link } from "react-router-dom";

export default function GenreSection({ genre, movies, total }) {
  return (
    <div className="genre-section">
      <div className="genre-header">
        <h2>
          {genre.name} ({total})
        </h2>
        <a href={`/movies?genre=${genre.name}`}>Se alle</a>
      </div>

      <div className="movie-list">
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            className="movie-card"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
