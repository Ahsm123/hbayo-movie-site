import React from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

const GenreSection = ({ genre, movies, total }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-10">
      <div className="section-header">
        <h2>{genre.name}</h2>
        <button
          className="btn-blue text-sm"
          type="button"
          onClick={() =>
            navigate(`/movies?genre=${encodeURIComponent(genre.name)}`)
          }
        >
          See all
        </button>
      </div>

      <div className="movie-row flex overflow-x-auto gap-3 pb-3 snap-x snap-mandatory md:grid md:overflow-x-visible md:snap-none md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group flex-shrink-0 w-36 snap-start md:w-auto"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSection;
