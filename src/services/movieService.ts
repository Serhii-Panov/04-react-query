import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie"

interface MovieApiResponse {
  results: Movie[];
  total_pages: number;
}

export default async function fetchMovies(query: string, page: number): Promise<MovieApiResponse> {
    const {data} = await axios.get<MovieApiResponse>(API_URL, {
      params: {
        query: query,
        page
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        Accept: "application/json",
      },
    });

    return data;

}
