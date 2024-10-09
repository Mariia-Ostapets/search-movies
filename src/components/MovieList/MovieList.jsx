import css from "./MovieList.module.css";
import { Link } from "react-router-dom";

export default function MovieList({ movies }) {
  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieItem}>
          <Link to={`/movies/${movie.id}`} className={css.movieLink}>
            <h2 className={css.movieTitle}>{movie.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
