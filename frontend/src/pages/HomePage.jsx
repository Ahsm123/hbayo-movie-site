import React from "react";
import GenreSection from "../components/GenreSection";
import { useGenreMovies } from "../hooks/useGenreMovies";

const HomePage = () => {
  const { selectedGenres, groupedMoviesByGenre } = useGenreMovies();

  // viser en sektion med film fra hver genre
  return (
    <div className="p-5">
      {selectedGenres.map((genre) => (
        <GenreSection
          key={genre.id}
          genre={genre}
          movies={groupedMoviesByGenre[genre.name]?.movies || []}
          total={groupedMoviesByGenre[genre.name]?.total || 0}
        />
      ))}
    </div>
  );
};

export default HomePage;
