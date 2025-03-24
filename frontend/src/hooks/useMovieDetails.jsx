import { useEffect, useState } from "react";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
} from "../services/tmdbService";

// henter detaljer om en film + relaterede data
export const useMovieDetails = (id) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const movieData = await fetchMovieDetails(id);
      setMovie(movieData);

      const creditData = await fetchMovieCredits(id);
      setCast(creditData.cast.slice(0, 5));
      setDirectors(creditData.crew.filter((p) => p.job === "Director"));

      const similarData = await fetchSimilarMovies(id);
      setSimilar(similarData.slice(0, 5));

      const trailerData = movieData?.videos?.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailer(trailerData);
    };

    loadData();
  }, [id]);

  const formatRuntime = (minutes) => {
    if (!minutes) return null;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const formattedRuntime = formatRuntime(movie?.runtime);
  const releaseYear = movie?.release_date?.slice(0, 4);

  return {
    movie,
    cast,
    directors,
    similar,
    trailer,
    formattedRuntime,
    releaseYear,
  };
};
