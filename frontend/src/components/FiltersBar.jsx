import React from "react";

const languages = [
  { code: "", name: "Alle sprog" },
  { code: "en", name: "Engelsk" },
  { code: "da", name: "Dansk" },
  { code: "fr", name: "Fransk" },
  { code: "ja", name: "Japansk" },
  { code: "es", name: "Spansk" },
];

export default function FiltersBar({
  genres,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  language,
  setLanguage,
}) {
  return (
    <div className="w-full mb-6">
      <div className="flex flex-col md:flex-row flex-wrap gap-4 text-white">
        <FilterBlock label="Genre">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="filter-select"
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </FilterBlock>

        <FilterBlock label="Sortér efter">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="popularity.desc">Populære</option>
            <option value="vote_average.desc">Bedst bedømte</option>
            <option value="release_date.desc">Nyeste</option>
            <option value="release_date.asc">Ældste</option>
            <option value="original_title.asc">A-Å</option>
            <option value="original_title.desc">Å-A</option>
          </select>
        </FilterBlock>

        <FilterBlock label="Sprog">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="filter-select"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </FilterBlock>
      </div>
    </div>
  );
}

function FilterBlock({ label, children }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-white">{label}</label>
      {children}
    </div>
  );
}
