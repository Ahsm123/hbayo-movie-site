import React from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

const GenreSection = ({ genre, movies, total }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-10">
      <div className="section-header">
        <h1>
          {genre.name} ({total})
        </h1>
        <button
          className="btn btn-yellow btn-sm btn-shadow"
          type="button"
          onClick={() =>
            navigate(`/movies?genre=${encodeURIComponent(genre.name)}`)
          }
        >
          See all
        </button>
      </div>

      <div className="movie-row">
        {movies.map((movie) => (
          <div key={movie.id} className="group movie-item">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSection;
