const GenreSelector = ({ genres, selectedGenre, setSelectedGenre }) => (
  <div className="mb-6 pt-4">
    <label htmlFor="genre" className="block text-white font-semibold mb-2">
      Genre
    </label>
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
