import { useState } from "react";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { useQuery } from "@tanstack/react-query";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

function App() {
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["movies", currentQuery],
    queryFn: () => fetchMovies(currentQuery, 1),
    enabled: currentQuery.length > 0,
  });
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const closeModal = () => setSelectedMovie(null);
  const handleSearch = (query: string) => {
    setCurrentQuery(query);
  };

  const handleMovieSelect = (movie: Movie) => {
    if (movie) {
      setSelectedMovie(movie);
    } else {
      toast.error("Error: Movie not found");
    }
  };
  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && <MovieGrid movies={data} onSelect={handleMovieSelect} />}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
