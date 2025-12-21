import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie"

interface MovieApiResponse {
  results: Movie[];
  total_page: number;
}

export default async function fetchMovies(query: string, page: number): Promise<Movie[]> {
    const response = await axios.get<MovieApiResponse>(API_URL, {
      params: {
        query: query,
        page: page,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        Accept: "application/json",
      },
    });

    return response.data.results;

}
