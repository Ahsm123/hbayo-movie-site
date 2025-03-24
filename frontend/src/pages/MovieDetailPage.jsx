import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies } from "../services/tmdbService";
import { useWishlist } from "../WishlistContext";
import { Heart, HeartOff } from "lucide-react";
import MovieCard from "../components/MovieCard";


const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [similar, setSimilar] = useState([]);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const loadData = async () => {
      const movieData = await fetchMovieDetails(id);
      setMovie(movieData);

      const creditData = await fetchMovieCredits(id);
      setCast(creditData.cast.slice(0, 5));
      setDirectors(creditData.crew.filter((p) => p.job === "Director"));

      const similarData = await fetchSimilarMovies(id);
      setSimilar(similarData.slice(0, 5));
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

  const formatRuntime = (minutes) => {
    if (!minutes) return null;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const formattedRuntime = formatRuntime(movie.runtime);
  const releaseYear = movie.release_date?.slice(0, 4);

  return (
    <div
      className="relative bg-cover bg-center min-h-screen before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/90 before:to-black/70"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 space-y-10">
        <div className="flex flex-col md:flex-row gap-8">
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
                    className="w-8 h-8 flex items-center justify-center rounded-full text-yellow-400 hover:text-red-500 transition-transform hover:scale-110"
                    title={
                      isInWishlist(movie.id)
                        ? "Fjern fra ønskeliste"
                        : "Tilføj til ønskeliste"
                    }
                  >
                    {isInWishlist(movie.id) ? (
                      <HeartOff size={20} />
                    ) : (
                      <Heart size={20} />
                    )}
                  </button>
                </h1>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {movie.vote_average && (
                    <span className="bg-yellow-400 text-black text-sm font-bold px-2 py-0.5 rounded shadow">
                      IMDb: {movie.vote_average.toFixed(1)}
                    </span>
                  )}
                  {formattedRuntime && (
                    <span className="bg-zinc-700 text-white text-sm px-2 py-0.5 rounded">
                      {formattedRuntime}
                    </span>
                  )}
                  {releaseYear && (
                    <span className="bg-zinc-700 text-white text-sm px-2 py-0.5 rounded">
                      {releaseYear}
                    </span>
                  )}
                  {movie.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-zinc-700 text-white text-sm px-2 py-0.5 rounded"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

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
          </div>
        </div>

        {trailer && (
          <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {similar.length > 0 && (
  <div className="space-y-2">
    <h2 className="text-xl font-bold text-white">Lignende film</h2>
    <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
      {similar.map((movie) => (
        <div key={movie.id} className="w-36 flex-shrink-0 snap-start">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default MovieDetailPage;
