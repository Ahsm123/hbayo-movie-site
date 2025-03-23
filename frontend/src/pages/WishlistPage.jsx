import { useWishlist } from "../WishlistContext";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-semibold text-white">Ønskeliste</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Ingen film på listen endnu.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {wishlist.map((movie) => (
            <div key={movie.id} className="w-36 sm:w-40">
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded shadow"
                />
                <p className="mt-2 text-sm text-center">{movie.title}</p>
              </Link>
              <button
                onClick={() => removeFromWishlist(movie.id)}
                className="btn-blue"
              >
                Fjern
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
