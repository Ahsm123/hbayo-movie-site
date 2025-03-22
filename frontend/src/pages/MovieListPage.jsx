import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchGenres, fetchMoviesByGenre } from "../services/tmdbService";
import { Link } from "react-router-dom";

const MovieListPage = () => {
  const [searchParams] = useSearchParams();
  const genreName = searchParams.get("genre");

  const [genreId, setGenreId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

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

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="movie-list-page">
      <h1>Alle film i genre: {genreName}</h1>
      <p>Total: {total}</p>

      <div className="movie-grid">
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

      {movies.length < total && (
        <button onClick={handleLoadMore} className="load-more-btn">
          Indlæs flere
        </button>
      )}
    </div>
  );
};

export default MovieListPage;
