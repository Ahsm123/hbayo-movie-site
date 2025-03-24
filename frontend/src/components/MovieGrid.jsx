import MovieCard from "./MovieCard";

const MovieGrid = ({ movies }) => (
  <div className="flex-grid">
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
);

export default MovieGrid;
