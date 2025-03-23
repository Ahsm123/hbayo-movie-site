// src/api/tmdb.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "da-DK",
  },
});

// movies

export async function fetchGenres() {
  const { data } = await tmdb.get("/genre/movie/list");
  return data.genres;
}

export async function fetchMoviesByGenre(genreId, page = 1) {
  const { data } = await tmdb.get("/discover/movie", {
    params: { with_genres: genreId, page },
  });
  return {
    movies: data.results,
    total: data.total_results,
  };
}

export async function fetchMovieDetails(id) {
  try {
    const { data } = await tmdb.get(`/movie/${id}`);
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

// tv-shows

// src/api/tmdb.js (or split into separate files/modules)

export async function fetchTvGenres() {
  const { data } = await tmdb.get("/genre/tv/list");
  return data.genres;
}

export async function fetchTvShowsByGenre(genreId, page = 1) {
  const { data } = await tmdb.get("/discover/tv", {
    params: { with_genres: genreId, page },
  });
  return {
    tvShows: data.results,
    total: data.total_results,
  };
}

export async function fetchTvShowDetails(id) {
  try {
    const { data } = await tmdb.get(`/tv/${id}`);
    return data;
  } catch {
    throw new Error("Kunne ikke hente tv-serie");
  }
}

export async function fetchTvShowCredits(id) {
  try {
    const { data } = await tmdb.get(`/tv/${id}/credits`);
    return data;
  } catch {
    throw new Error("Kunne ikke hente tv-seriens credits");
  }
}
