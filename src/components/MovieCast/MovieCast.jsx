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
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
}
