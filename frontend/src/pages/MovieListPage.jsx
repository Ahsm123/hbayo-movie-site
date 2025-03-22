import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { fetchGenres, fetchMoviesByGenre } from "../services/tmdbService";

const MovieListPage = () => {
  const [searchParams] = useSearchParams();
  const genreName = searchParams.get("genre");

  const [genreId, setGenreId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loaderRef = useRef(null);

  useEffect(() => {
    const loadGenre = async () => {
      const allGenres = await fetchGenres();
      const found = allGenres.find((g) => g.name === genreName);
      if (!found) return;
      setGenreId(found.id);
    };

    loadGenre();
  }, [genreName]);

  useEffect(() => {
    const loadMovies = async () => {
      if (!genreId) return;
      const result = await fetchMoviesByGenre(genreId, page);
      setMovies((prev) => [...prev, ...result.movies]);
      setTotal(result.total);
    };

    loadMovies();
  }, [genreId, page]);

  useEffect(() => {
    if (!loaderRef.current || movies.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const target = loaderRef.current;
    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [movies]);

  return (
    <div className="movie-list-page min-h-screen pb-16">
      <h1 className="text-xl font-semibold text-white">{genreName}</h1>
      <p className="text-l text-white">Total: {total}</p>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {movies.length < total && <div ref={loaderRef} className="h-10" />}
    </div>
  );
};

export default MovieListPage;
