import { useEffect, useState } from "react";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
} from "../services/tmdbService";
import { getPreloadedMovieData } from "../utils/moviePreloadCache";

// henter detaljer om en film + relaterede data
export const useMovieDetails = (id) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const cached = getPreloadedMovieData(id);

      let movieData, creditData;

      if (cached) {
        movieData = cached.details;
        creditData = cached.credits;
      } else {
        movieData = await fetchMovieDetails(id);
        creditData = await fetchMovieCredits(id);
      }

      setMovie(movieData);
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
