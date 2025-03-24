import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByGenre } from "../services/tmdbService";
import { useFilteredGenres } from "../hooks/useFilteredGenres";

import GenreSelector from "../components/GenreSelector";
import MovieGrid from "../components/MovieGrid";
import ScrollToTopButton from "../components/ScrollToTopButton";
import LoaderSpinner from "../components/LoaderSpinner";

const MovieListPage = () => {
  const [searchParams] = useSearchParams();
  const initialGenre = searchParams.get("genre");

  const { genres, selectedGenre, setSelectedGenre, genreId } =
    useFilteredGenres(initialGenre);

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const loaderRef = useRef(null);

  // reset når genre bliver skiftet
  useEffect(() => {
    if (genreId) {
      setMovies([]);
      setPage(1);
    }
  }, [genreId]);

  // load film når genre bliver skiftet
  useEffect(() => {
    if (!genreId) return;

    const loadMovies = async () => {
      const result = await fetchMoviesByGenre(genreId, page);
      setMovies((prev) => {
        const newMovies = result.movies.filter(
          (movie) => !prev.some((m) => m.id === movie.id)
        );
        return [...prev, ...newMovies];
      });
    };

    loadMovies();
  }, [genreId, page]);

  // infinity scroll observer
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

    return () => observer.unobserve(target);
  }, [movies]);

  // scroll to top
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="movie-list-page min-h-screen pb-20 px-4 transition-colors duration-500">
      <GenreSelector
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      <MovieGrid movies={movies} />

      <LoaderSpinner loaderRef={loaderRef} />

      <ScrollToTopButton
        show={showScrollTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
};

export default MovieListPage;
