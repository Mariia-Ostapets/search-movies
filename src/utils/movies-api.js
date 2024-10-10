import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWIzMTRhZGUxMDg3Njk3YzZhMjhlZDliYjg3YTY1NCIsIm5iZiI6MTcyODQ2NjkzOS40NzczNCwic3ViIjoiNjcwNjRkNzBkYzU0ZjI5ZDBlYWI1OTkxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ISDYngjc0IyzJ3U2VfhO4xyU_ETQVXYagSVEYpt7CC8";

const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies() {
  const url = `${BASE_URL}/trending/movie/day`;
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const response = await axios.get(url, options);
  return response.data;
}
