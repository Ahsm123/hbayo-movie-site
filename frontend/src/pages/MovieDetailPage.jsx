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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full md:w-64 rounded shadow"
      />

      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <button
            onClick={toggleWishlist}
            className="text-3xl hover:scale-110 transition"
            title="Tilføj til ønskeliste"
          >
            {isInWishlist(movie.id) ? "⭐" : "☆"}
          </button>
        </div>

        <p>
          <strong>Udgivelsesår:</strong> {movie.release_date.slice(0, 4)}
        </p>

        <p>
          <strong>Genre:</strong> {movie.genres.map((g) => g.name).join(", ")}
        </p>

        <p>{movie.overview}</p>

        <p>
          <strong>Instruktør:</strong> {directors.map((d) => d.name).join(", ")}
        </p>

        <p>
          <strong>Skuespillere:</strong>{" "}
          {cast.map((actor) => `${actor.name} (${actor.character})`).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default MovieDetailPage;
