import css from "./MoviesPage.module.css";
import SearchMovieForm from "../../components/SearchMovieForm/SearchMovieForm";
import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { fetchMoviesByQuery } from "../../utils/search-movies-query-api";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const onSearch = (searchTerm) => {
    if (searchTerm) {
      setSearchParams({ query: searchTerm });
    }
  };

  useEffect(() => {
    if (!query) return;

    async function fetchDataByQuery() {
      try {
        setIsLoading(true);
        const data = await fetchMoviesByQuery(query);
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDataByQuery();
  }, [query]);

  return (
    <div>
      <SearchMovieForm onSearch={onSearch} />
      {isLoading && <Loader />}
      {error && (
        <p>
          Oops, some error occured &quot;{error}&quot;. Please, try again later.
        </p>
      )}
      {!isLoading && movies.length > 0 && (
        <MovieList
          movies={movies}
          from="movies"
          search={searchParams.toString()}
        />
      )}
      {!isLoading && movies.length === 0 && query && <p>No movies found</p>}
    </div>
  );
}
