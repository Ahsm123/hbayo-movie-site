import { NavLink } from "react-router-dom";

export default function NavbarBrand({ isOpen, setIsOpen }) {
  return (
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
        aria-label="Toggle menu"
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
  );
}
