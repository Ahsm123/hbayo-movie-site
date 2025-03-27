import axios from "axios";

const API_READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_READ_TOKEN}`,
  },
  params: {
    // language: "da-DK",
  },
});

// movies

export async function fetchGenres() {
  const { data } = await tmdb.get("/genre/movie/list");
  return data.genres;
}

export async function searchMovies(query) {
  const { data } = await tmdb.get("/search/movie", {
    params: { query },
  });
  return data.results;
}

export async function fetchMoviesByGenre(genreId, page = 1, filters = {}) {
  const { data } = await tmdb.get("/discover/movie", {
    params: {
      with_genres: genreId,
      page,
      ...filters,
    },
  });

  return {
    movies: data.results,
    total: data.total_results,
  };
}

export async function fetchSimilarMovies(id) {
  try {
    const { data } = await tmdb.get(`/movie/${id}/similar`);
    return data.results;
  } catch {
    throw new Error("Kunne ikke hente lignende film");
  }
}

export async function fetchMovieDetails(id) {
  try {
    const { data } = await tmdb.get(`/movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    });
    return data;
  } catch {
    throw new Error("Kunne ikke hente film");
  }
}

export async function fetchMovieCredits(id) {
  try {
    const { data } = await tmdb.get(`/movie/${id}/credits`);
    return data;
  } catch {
    throw new Error("Kunne ikke hente filmens credits");
  }
}
