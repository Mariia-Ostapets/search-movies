import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { fetchMovieReviews } from "../../utils/seach-movie-reviews";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovieReviews() {
      try {
        setIsLoading(true);
        const data = await fetchMovieReviews(movieId);
        if (data && data.results) {
          setReviews(data.results);
        } else {
          setReviews([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <p>Error fetching movie reviews: {error}</p>}
      {!isLoading && reviews.length === 0 && (
        <p>We don't have any reviews for this movie.</p>
      )}
      {reviews.length > 0 && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p className={css.reviewAuthorDescr}>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
