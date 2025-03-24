const GenreSelector = ({ genres, selectedGenre, setSelectedGenre }) => (
  <div className="mb-6 pt-4">
    <h1>Genre</h1>
    <select
      id="genre"
      value={selectedGenre}
      onChange={(e) => setSelectedGenre(e.target.value)}
      className="genre-dropdown"
    >
      {genres.map((genre) => (
        <option key={genre.id} value={genre.name}>
          {genre.name}
        </option>
      ))}
    </select>
  </div>
);

export default GenreSelector;
