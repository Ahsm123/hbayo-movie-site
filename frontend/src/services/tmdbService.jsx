const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchGenres() {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=da-DK`
  );
  const data = await res.json();
  return data.genres;
}

export async function fetchMoviesByGenre(genreId, page = 1) {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
  );
  const data = await res.json();

  return {
    movies: data.results,
    total: data.total_results,
  };
}

export async function fetchMovieDetails(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=da-DK`
  );
  if (!res.ok) throw new Error("Kunne ikke hente film");
  return await res.json();
}

export async function fetchMovieCredits(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=da-DK`
  );
  if (!res.ok) throw new Error("Kunne ikke hente filmens credits");
  return await res.json();
}
