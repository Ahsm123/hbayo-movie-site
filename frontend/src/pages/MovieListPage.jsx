import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { fetchGenres, fetchMoviesByGenre } from "../services/tmdbService";

const genreNames = [
  "Action",
  "Comedy",
  "Thriller",
  "War",
  "Romance",
  "Drama",
  "Crimi",
  "Documentary",
  "Horror",
];

const genreColors = {
  Action: "#1e3a8a",
  Komedie: "#facc15",
  Thriller: "#f87171",
  Krig: "#a16207",
  Romantik: "#f472b6",
  Drama: "#6b7280",
  Kriminalitet: "#4b5563",
  Documentary: "#34d399",
  Gyser: "#111827",
};

const MovieListPage = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genreId, setGenreId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const loaderRef = useRef(null);
  const [searchParams] = useSearchParams();
  const initialGenre = searchParams.get("genre");

  const currentColor = genreColors[selectedGenre] || "#1f2937";

  // Hent og filtrer genrer
  useEffect(() => {
    const loadGenres = async () => {
      const allGenres = await fetchGenres();
      const filtered = allGenres.filter((g) => genreNames.includes(g.name));
      setGenres(filtered);

      if (!selectedGenre && filtered.length > 0) {
        const fallback =
          initialGenre && genreNames.includes(initialGenre)
            ? initialGenre
            : filtered[0].name;

        setSelectedGenre(fallback);
        const genre = filtered.find((g) => g.name === fallback);
        setGenreId(genre.id);
      }
    };

    loadGenres();
  }, []);

  useEffect(() => {
    const found = genres.find((g) => g.name === selectedGenre);
    if (found) {
      setMovies([]);
      setPage(1);
      setGenreId(found.id);
    }
  }, [selectedGenre]);

  useEffect(() => {
    const loadMovies = async () => {
      if (!genreId) return;
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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="movie-list-page min-h-screen pb-20 px-4 transition-colors duration-500"
      style={{ backgroundColor: currentColor }}
    >
      <div className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-white mb-2">Genre</h1>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div ref={loaderRef} className="h-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-yellow-400"></div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-yellow-400 text-black font-bold px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 transition"
        >
          ↑ Top
        </button>
      )}
    </div>
  );
};

export default MovieListPage;
