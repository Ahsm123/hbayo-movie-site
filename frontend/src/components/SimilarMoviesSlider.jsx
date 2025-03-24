import MovieCard from "./MovieCard";

const SimilarMoviesSlider = ({ movies }) => (
  <div className="space-y-2">
    <h2 className="text-xl font-bold text-white">Lignende film</h2>
    <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
      {movies.map((movie) => (
        <div key={movie.id} className="w-36 flex-shrink-0 snap-start">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  </div>
);

export default SimilarMoviesSlider;
