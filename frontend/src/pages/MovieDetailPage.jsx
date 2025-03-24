import { useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useWishlist } from "../WishlistContext";
import MovieHeader from "../components/MovieHeader";
import TrailerEmbed from "../components/TrailerEmbed";
import SimilarMoviesSlider from "../components/SimilarMoviesSlider";

const MovieDetailPage = () => {
  const { id } = useParams();
  const {
    movie,
    cast,
    directors,
    similar,
    trailer,
    formattedRuntime,
    releaseYear,
  } = useMovieDetails(id);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!movie)
    return <p className="text-center mt-8 text-zinc-300">Indlæser...</p>;

  const toggleWishlist = () => {
    isInWishlist(movie.id)
      ? removeFromWishlist(movie.id)
      : addToWishlist(movie);
  };

  return (
    <div
      className="relative bg-cover bg-center min-h-screen before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/90 before:to-black/70"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 space-y-10">
        <MovieHeader
          movie={movie}
          formattedRuntime={formattedRuntime}
          releaseYear={releaseYear}
          directors={directors}
          cast={cast}
          isInWishlist={isInWishlist(movie.id)}
          toggleWishlist={toggleWishlist}
        />

        {trailer && <TrailerEmbed trailerKey={trailer.key} />}

        {similar.length > 0 && <SimilarMoviesSlider movies={similar} />}
      </div>
    </div>
  );
};

export default MovieDetailPage;
