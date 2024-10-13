import css from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { fetchMovieCast } from "../../utils/seach-movie-cast";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovieCast() {
      try {
        setIsLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <p>Error fetching movie cast: {error}</p>}
      {!isLoading && cast.length === 0 && (
        <p>We don't have info about cast for this movie.</p>
      )}
      {cast.length > 0 && (
        <ul className={css.castList}>
          {cast.map((actor) => (
            <li key={actor.id} className={css.castItem}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name || "Actor"}
                  style={{ width: "100px", height: "150px" }}
                />
              ) : (
                <p
                  style={{
                    width: "100px",
                    height: "150px",
                    textAlign: "center",
                  }}
                >
                  Image not found
                </p>
              )}
              <div>
                {actor.name ? (
                  <p className={css.actorName}>{actor.name}</p>
                ) : (
                  <p>Name not found</p>
                )}
                <p>Character: {actor.character || "Character not available"}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
