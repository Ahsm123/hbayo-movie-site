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

export async function fetchMoviesByGenre(genreId, page = 1) {
  const { data } = await tmdb.get("/discover/movie", {
    params: { with_genres: genreId, page },
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
        append_to_response: "videos"
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
