import { useWishlist } from "../WishlistContext";
import MovieCard from "../components/MovieCard";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-semibold text-white mb-4">Ønskeliste</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Ingen film på listen endnu.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {wishlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemove={removeFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
