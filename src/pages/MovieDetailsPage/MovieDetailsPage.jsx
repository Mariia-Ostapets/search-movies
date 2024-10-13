import css from "./MovieDetailsPage.module.css";
import { useEffect, useState, Suspense } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchMovieById } from "../../utils/search-movies-id-api";
import Loader from "../../components/Loader/Loader";
import { onOpenHandle } from "../../utils/open-handle";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(null);

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

  useEffect(() => {
    if (activeSection === "cast") {
      const castSection = document.getElementById("cast-section");
      if (castSection) {
        onOpenHandle(castSection);
      }
    } else if (activeSection === "reviews") {
      const reviewsSection = document.getElementById("reviews-section");
      if (reviewsSection) {
        onOpenHandle(reviewsSection);
      }
    }
  }, [activeSection]);

  const handleLinkGoBack =
    location.state?.from === "movies" && location.state?.search
      ? `/movies?query=${location.state.search}`
      : location.state?.from === "home"
      ? "/"
      : "/movies";

  const handleToggleSection = (section) => {
    setActiveSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  return (
    <div>
      <Link to={handleLinkGoBack} className={css.linkGoBack}>
        <IoIosArrowRoundBack />
        Go back
      </Link>
      {isLoading && <Loader />}
      {error && <p>Error fetching movie details: {error}</p>}
      {movieDetails && (
        <div className={css.movieDetailsContainer}>
          <img
            className={css.movieImage}
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <div className={css.movieDetailsInfo}>
            <h1>{movieDetails.title}</h1>
            <p>User Score: {(movieDetails.vote_average * 10).toFixed(1)}%</p>
            <h2>Overview</h2>
            <p>{movieDetails.overview}</p>
            <h3>Genres</h3>
            <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      )}
      {!isLoading && (
        <nav className={css.movieDetailsNav}>
          <h2 className={css.additionalInfoTitle}>Additional information</h2>
          <ul>
            <li>
              <Link
                to="cast"
                state={location.state}
                onClick={() => handleToggleSection("cast")}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                to="reviews"
                state={location.state}
                onClick={() => handleToggleSection("reviews")}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <div id="cast-section">
        {activeSection === "cast" && (
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        )}
      </div>
      <div id="reviews-section">
        {activeSection === "reviews" && (
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        )}
      </div>
    </div>
  );
}
