import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

export default function GenreSection({ genre, movies, total, onLoadMore }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!onLoadMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [onLoadMore]);

  return (
    <div className="mb-10">
      <div className="section-header">
        <h2 className="text-xl font-semibold text-white">
          {genre.name} ({total})
        </h2>
        <Link
          to={`/movies?genre=${genre.name}`}
          className="text-sm text-blue-400 hover:underline"
        >
          <button className="btn-blue">Se alle</button>
        </Link>
      </div>

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {onLoadMore && <div ref={loaderRef} className="h-10" />}
    </div>
  );
}
