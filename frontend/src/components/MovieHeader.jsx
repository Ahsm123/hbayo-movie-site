import { Heart, HeartOff } from "lucide-react";
import MovieBadges from "./MovieBadges";

const MovieHeader = ({
  movie,
  formattedRuntime,
  releaseYear,
  directors,
  cast,
  isInWishlist,
  toggleWishlist,
}) => {
  return (
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
                  isInWishlist
                    ? "Fjern fra ønskeliste"
                    : "Tilføj til ønskeliste"
                }
              >
                {isInWishlist ? <HeartOff size={20} /> : <Heart size={20} />}
              </button>
            </h1>

            <MovieBadges
              voteAverage={movie.vote_average}
              formattedRuntime={formattedRuntime}
              releaseYear={releaseYear}
              genres={movie.genres}
            />
          </div>
        </div>

        <p className="leading-relaxed">{movie.overview}</p>

        <p>
          <span className="font-semibold text-white">Instruktør:</span>{" "}
          {directors.map((d) => d.name).join(", ")}
        </p>

        <p>
          <span className="font-semibold text-white">Skuespillere:</span>{" "}
          {cast.map((actor) => `${actor.name} (${actor.character})`).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default MovieHeader;
