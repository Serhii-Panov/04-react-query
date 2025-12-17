import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie"

interface MovieApiResponse {
  results: Movie[];
}

export default async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await axios.get<MovieApiResponse>(API_URL, {
      params: {
        query: query,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        Accept: "application/json",
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
}
