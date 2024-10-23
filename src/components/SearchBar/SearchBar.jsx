import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";

import css from "./SearchBar.module.css";

const INITIAL_VALUES = {
  searchTerm: "",
};

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    if (values.searchTerm === "") {
      toast.error("Please enter a search term");
    } else {
      onSubmit(values.searchTerm);
      actions.resetForm();
    }
  };

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <label className={css.label}>
          <Field
            type="text"
            name="searchTerm"
            className={css.input}
            placeholder="Enter search term"
          />
        </label>
        <button type="submit">Search photo</button>
        <Toaster />
      </Form>
    </Formik>
  );
};

export default SearchBar;
