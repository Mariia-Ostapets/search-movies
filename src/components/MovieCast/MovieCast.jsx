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

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

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
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : defaultImg
                }
                alt={actor.name || "Actor"}
                style={{ width: "100px", height: "150px" }}
              />
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
