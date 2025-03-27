const movieCache = new Map();

export const preloadMovieData = async (id, fetchDetails, fetchCredits) => {
  if (!movieCache.has(id)) {
    const [details, credits] = await Promise.all([
      fetchDetails(id),
      fetchCredits(id),
    ]);

    movieCache.set(id, { details, credits });
  }
};

export const getPreloadedMovieData = (id) => movieCache.get(id);
