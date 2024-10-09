import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../movies-api";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchMovies();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {movies.length > 0 && <MovieList movies={movies} from="home" />}
    </div>
  );
}
