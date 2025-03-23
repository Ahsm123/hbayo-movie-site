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
      console.log("🎥 Fetched movie:", movieData);
      console.log("🎬 Trailers:", movieData.videos?.results); // ← denne skal give noget
      setMovie(movieData);

      const creditData = await fetchMovieCredits(id);
      setCast(creditData.cast.slice(0, 5));
      setDirectors(creditData.crew.filter((p) => p.job === "Director"));
    };

    loadData();
  }, [id]);

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

  if (!movie)
    return <p className="text-center mt-8 text-zinc-300">Indlæser...</p>;

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
      className="relative bg-cover bg-center min-h-screen before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/90 before:to-black/70"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg sticky top-8"
          />
        </div>

        <div className="flex-1 space-y-4 text-zinc-200">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                {movie.title}
                <button
                  onClick={toggleWishlist}
                  className="text-2xl transition hover:scale-110 text-yellow-400"
                  title="Tilføj til ønskeliste"
                >
                  {isInWishlist(movie.id) ? "⭐" : "☆"}
                </button>
              </h1>

              {movie.vote_average && (
                <div className="inline-block mt-2 bg-yellow-400 text-black text-sm font-bold px-2 py-0.5 rounded shadow">
                  IMDb: {movie.vote_average.toFixed(1)}
                </div>
              )}
            </div>
          </div>

          <p>
            <span className="font-semibold text-white">Udgivelsesår:</span>{" "}
            {movie.release_date.slice(0, 4)}
          </p>

          <p>
            <span className="font-semibold text-white">Genre:</span>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </p>

          <p className="leading-relaxed">{movie.overview}</p>

          <p>
            <span className="font-semibold text-white">Instruktør:</span>{" "}
            {directors.map((d) => d.name).join(", ")}
          </p>

          <p>
            <span className="font-semibold text-white">Skuespillere:</span>{" "}
            {cast
              .map((actor) => `${actor.name} (${actor.character})`)
              .join(", ")}
          </p>

          {trailer && (
            <div className="w-full aspect-video mt-6 rounded-lg overflow-hidden shadow-lg">
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
