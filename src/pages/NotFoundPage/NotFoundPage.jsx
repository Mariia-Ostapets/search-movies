import css from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";
import { TbFaceIdError } from "react-icons/tb";

export default function NotFoundPage() {
  return (
    <div>
      <Link to="/">Go to Home</Link>
      <div className={css.notFoundWrapper}>
        <TbFaceIdError size={54} />
        <h1>Page Not Found</h1>
      </div>
    </div>
  );
}
