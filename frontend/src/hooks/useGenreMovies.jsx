import { useEffect, useState } from "react";
import { fetchGenres, fetchMoviesByGenre } from "../services/tmdbService";
import { GENRE_NAMES } from "../constants/genres";

// henter genre og et udpluk af film.
export const useGenreMovies = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [groupedMoviesByGenre, setGroupedMoviesByGenre] = useState({});

  useEffect(() => {
    const loadGenresAndMovies = async () => {
      try {
        const allGenres = await fetchGenres();
        const filteredGenres = allGenres.filter((g) =>
          GENRE_NAMES.includes(g.name)
        );
        setSelectedGenres(filteredGenres);
        // henter kun fra de genre der er i genres.jsx
        const genreMovieMap = {};
        for (const genre of filteredGenres) {
          const result = await fetchMoviesByGenre(genre.id);
          genreMovieMap[genre.name] = {
            movies: result.movies.slice(0, 11),
            total: result.total,
          };
        }

        setGroupedMoviesByGenre(genreMovieMap);
      } catch (error) {
        console.error("Error fetching genres or movies:", error);
      }
    };

    loadGenresAndMovies();
  }, []);

  return { selectedGenres, groupedMoviesByGenre };
};
