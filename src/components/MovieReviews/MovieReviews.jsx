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
        setReviews(data.reviews);
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
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              {review.author}: {review.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}
