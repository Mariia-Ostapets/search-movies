import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../utils/movies-api";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await fetchMovies();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={css.homePageWrapper}>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {error && (
        <p>
          Oops, some error occured &quot;{error}&quot;. Please, try again later.
        </p>
      )}
      {movies.length > 0 && <MovieList movies={movies} from="home" />}
    </div>
  );
}
