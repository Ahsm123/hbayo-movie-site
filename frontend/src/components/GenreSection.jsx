import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GenreSection = ({ genre, movies, total }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-10 relative">
      <div className="section-header">
        <h1>
          {genre.name} ({total})
        </h1>
        <button
          className="btn btn-yellow btn-sm btn-shadow"
          type="button"
          onClick={() =>
            navigate(`/movies?genre=${encodeURIComponent(genre.name)}`)
          }
        >
          <span className="group inline-flex items-center gap-1">
            See all
            <ChevronRight
              className="transition-transform group-hover:translate-x-1"
              size={16}
            />
          </span>
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll(-300)}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-yellow-400 text-white hover:text-black rounded-full p-2 transition"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        <div ref={scrollRef} className="movie-row scrollbar-hidden pr-4">
          {movies.map((movie) => (
            <div key={movie.id} className="group movie-item">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll(300)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-yellow-400 text-white hover:text-black rounded-full p-2 transition"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default GenreSection;
