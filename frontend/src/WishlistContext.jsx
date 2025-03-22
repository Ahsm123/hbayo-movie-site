import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (movie) => {
    if (!wishlist.find((m) => m.id === movie.id)) {
      setWishlist((prev) => [...prev, movie]);
    }
  };

  const removeFromWishlist = (movieId) => {
    setWishlist((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isInWishlist = (movieId) => wishlist.some((m) => m.id === movieId);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
