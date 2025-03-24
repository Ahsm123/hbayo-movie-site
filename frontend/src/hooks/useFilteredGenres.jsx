import { useEffect, useState } from "react";
import { fetchGenres } from "../services/tmdbService";
import { GENRE_NAMES } from "../constants/genres";

export const useFilteredGenres = (initialGenre) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genreId, setGenreId] = useState(null);

  useEffect(() => {
    const loadGenres = async () => {
      const all = await fetchGenres();
      const filtered = all.filter((g) => GENRE_NAMES.includes(g.name));
      setGenres(filtered);

      const fallback =
        initialGenre && GENRE_NAMES.includes(initialGenre)
          ? initialGenre
          : filtered[0]?.name;

      if (fallback) {
        setSelectedGenre(fallback);
        setGenreId(filtered.find((g) => g.name === fallback)?.id);
      }
    };

    loadGenres();
  }, [initialGenre]);

  useEffect(() => {
    const found = genres.find((g) => g.name === selectedGenre);
    if (found) setGenreId(found.id);
  }, [selectedGenre, genres]);

  return { genres, selectedGenre, setSelectedGenre, genreId };
};
