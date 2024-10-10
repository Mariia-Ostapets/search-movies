import css from "./SearchMovieForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { CiSearch } from "react-icons/ci";

const INITIAL_VALUES = {
  searchTerm: "",
};

const SearchProductsSchema = Yup.object({
  searchTerm: Yup.string()
    .required("Search term is required")
    .min(2, "Search term must be at least 2 characters"),
});

export default function SearchMovieForm({ onSearch }) {
  const handleSubmit = (values, actions) => {
    onSearch(values.searchTerm);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={SearchProductsSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <Field
            type="text"
            name="searchTerm"
            className={css.input}
            placeholder="Enter search term"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="searchTerm"
            component="span"
          />
        </label>

        <button type="submit">
          Search
          <CiSearch />
        </button>
      </Form>
    </Formik>
  );
}
