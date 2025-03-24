import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../../services/tmdbService";

export default function NavbarSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.length > 1) {
        const data = await searchMovies(searchTerm);
        setResults(data.slice(0, 5));
        setShowDropdown(true);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
        setSearchTerm("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (id) => {
    setSearchTerm("");
    setResults([]);
    setShowDropdown(false);
    navigate(`/movies/${id}`);
  };

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative w-40 lg:w-48 xl:w-56 ml-6"
    >
      <input
        type="text"
        placeholder="Søg film..."
        className="w-full px-3 py-1 rounded bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {showDropdown && results.length > 0 && (
        <ul className="absolute z-50 top-full left-0 right-0 bg-zinc-900/95 text-white rounded-lg shadow-lg mt-1 backdrop-blur-sm border border-zinc-700">
          {results.map((movie, index) => (
            <div key={movie.id}>
              <li
                className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 transition cursor-pointer"
                onClick={() => handleResultClick(movie.id)}
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                ) : (
                  <div className="w-10 h-14 bg-zinc-300 rounded flex items-center justify-center text-xs text-zinc-500">
                    N/A
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm">{movie.title}</p>
                  <p className="text-xs text-zinc-400">
                    {movie.release_date?.slice(0, 4) || "Ukendt år"}
                  </p>
                </div>
              </li>
              {index < results.length - 1 && (
                <hr className="border-zinc-800 mx-4" />
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
