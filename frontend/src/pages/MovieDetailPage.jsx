import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails, fetchMovieCredits } from "../services/tmdbService";
import { useWishlist } from "../WishlistContext";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [directors, setDirectors] = useState([]);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const loadData = async () => {
      const movieData = await fetchMovieDetails(id);
      setMovie(movieData);

      const creditData = await fetchMovieCredits(id);
      setCast(creditData.cast.slice(0, 5));
      setDirectors(creditData.crew.filter((p) => p.job === "Director"));
    };

    loadData();
  }, [id]);

  if (!movie) return <p className="text-center mt-8">Indlæser...</p>;

  const toggleWishlist = () => {
    isInWishlist(movie.id)
      ? removeFromWishlist(movie.id)
      : addToWishlist(movie);
  };

  const trailer = movie?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div
      className="relative bg-cover bg-center min-h-screen before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/80 before:to-black/70"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="bg-black/20 max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-8 backdrop-blur-md shadow-lg">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-64 shadow"
        />

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
              {movie.title}
              <button
                onClick={toggleWishlist}
                className="text-2xl hover:scale-110 transition text-white"
                title="Tilføj til ønskeliste"
              >
                {isInWishlist(movie.id) ? "⭐" : "☆"}
              </button>
            </h1>
          </div>

          <p className="text-white">
            <strong>Udgivelsesår:</strong> {movie.release_date.slice(0, 4)}
          </p>

          <p className="text-white">
            <strong>Genre:</strong> {movie.genres.map((g) => g.name).join(", ")}
          </p>

          <p className="text-white">
            <strong>IMDb:</strong>{" "}
            {movie.vote_average
              ? `${movie.vote_average}/10`
              : "Ikke tilgængelig"}
          </p>

          <p className="text-white">{movie.overview}</p>

          <p className="text-white">
            <strong>Instruktør:</strong>{" "}
            {directors.map((d) => d.name).join(", ")}
          </p>

          <p className="text-white">
            <strong>Skuespillere:</strong>{" "}
            {cast
              .map((actor) => `${actor.name} (${actor.character})`)
              .join(", ")}
          </p>

          {trailer && (
            <div className="w-full aspect-video mt-6 rounded overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
