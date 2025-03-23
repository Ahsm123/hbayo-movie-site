import React, { useEffect, useState } from "react";
import { fetchGenres, fetchMoviesByGenre } from "../services/tmdbService";
import GenreSection from "../components/GenreSection";

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

const HomePage = () => {
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const allGenres = await fetchGenres();
        const filtered = allGenres.filter((g) => genreNames.includes(g.name));
        setGenres(filtered);

        const data = {};
        for (const genre of filtered) {
          const result = await fetchMoviesByGenre(genre.id);
          data[genre.name] = {
            movies: result.movies.slice(0, 11),
            total: result.total,
          };
        }
        setMoviesByGenre(data);
      } catch (error) {
        console.error("Fejl ved hentning af genre eller film:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {genres.map((genre) => (
        <GenreSection
          key={genre.id}
          genre={genre}
          movies={moviesByGenre[genre.name]?.movies || []}
          total={moviesByGenre[genre.name]?.total || 0}
        />
      ))}
    </div>
  );
};

export default HomePage;
