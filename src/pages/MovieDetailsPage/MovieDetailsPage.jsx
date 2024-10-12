import css from "./MovieDetailsPage.module.css";
import { useEffect, useState } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchMovieById } from "../../utils/search-movies-id-api";
import Loader from "../../components/Loader/Loader";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const data = await fetchMovieById(movieId);
        setMovieDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [movieId]);

  const handleLinkGoBack =
    location.state?.from === "movies" && location.state?.search
      ? `/movies?query=${location.state.search}`
      : location.state?.from === "home"
      ? "/"
      : "/movies";

  return (
    <div>
      <Link to={handleLinkGoBack}>Go back</Link>
      {isLoading && <Loader />}
      {error && <p>Error fetching movie details: {error}</p>}
      {movieDetails && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <div>
            <h1 className={css.movieTitle}>{movieDetails.title}</h1>
            <p>User Score: {(movieDetails.vote_average * 10).toFixed(1)}%</p>
            <h2>Overview</h2>
            <p>{movieDetails.overview}</p>
            <h3>Genres</h3>
            <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      )}
      <nav>
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link to="cast" state={location.state}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={location.state}>
              Reviews
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
