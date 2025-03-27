const languages = [
  { code: "", name: "Alle sprog" },
  { code: "en", name: "Engelsk" },
  { code: "da", name: "Dansk" },
  { code: "fr", name: "Fransk" },
  { code: "ja", name: "Japansk" },
  { code: "es", name: "Spansk" },
];

export default function MovieFilters({
  sortBy,
  setSortBy,
  language,
  setLanguage,
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end text-white">
      <div>
        <label className="block text-sm font-medium">Sortér efter</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-zinc-800 rounded px-3 py-1"
        >
          <option value="popularity.desc">Populære</option>
          <option value="vote_average.desc">Bedst bedømte</option>
          <option value="release_date.desc">Nyeste</option>
          <option value="release_date.asc">Ældste</option>
          <option value="original_title.asc">A-Å</option>
          <option value="original_title.desc">Å-A</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Sprog</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-zinc-800 rounded px-3 py-1"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
