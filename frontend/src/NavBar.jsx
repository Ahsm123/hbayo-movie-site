import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { searchMovies } from "./services/tmdbService";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

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

    const debounce = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleResultClick = (id) => {
    setSearchTerm("");
    setResults([]);
    setShowDropdown(false);
    navigate(`/movies/${id}`);
  };

  return (
    <nav className="navbar bg-zinc-900 text-white border-b border-zinc-800 px-6 py-4 shadow-md">
      <div className="flex justify-between items-center w-full">
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className="text-3xl font-extrabold tracking-widest bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2 transition hover:opacity-90"
        >
          🎬 HBayO 🏝️
        </NavLink>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex md:items-center gap-6 mt-4 md:mt-0`}
      >
        <div className="hidden md:block relative w-40 lg:w-48 xl:w-56 ml-6">
          <input
            type="text"
            placeholder="Søg film..."
            className="w-full px-3 py-1 rounded bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {showDropdown && results.length > 0 && (
            <ul className="absolute z-50 top-full left-0 right-0 bg-white text-black rounded shadow mt-1 overflow-hidden">
              {results.map((movie) => (
                <li
                  key={movie.id}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-100 transition cursor-pointer"
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
                    <p className="text-xs text-zinc-500">
                      {movie.release_date?.slice(0, 4) || "Ukendt år"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <li>
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "text-yellow-400" : "hover:text-yellow-400"
              }`
            }
          >
            Forside
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/wishlist"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "text-yellow-400" : "hover:text-yellow-400"
              }`
            }
          >
            Ønskeliste
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "text-yellow-400" : "hover:text-yellow-400"
              }`
            }
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
