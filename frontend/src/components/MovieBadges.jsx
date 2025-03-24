const MovieBadges = ({
  voteAverage,
  formattedRuntime,
  releaseYear,
  genres,
}) => (
  <div className="flex flex-wrap items-center gap-2 mt-2">
    {voteAverage && (
      <span className="bg-yellow-400 text-black text-sm font-bold px-2 py-0.5 rounded shadow">
        IMDb: {voteAverage.toFixed(1)}
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
    {genres?.map((genre) => (
      <span
        key={genre.id}
        className="bg-zinc-700 text-white text-sm px-2 py-0.5 rounded"
      >
        {genre.name}
      </span>
    ))}
  </div>
);

export default MovieBadges;
