import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

import css from "./SearchBar.module.css";

const INITIAL_VALUES = {
  searchTerm: "",
};

const SearchBar = ({ onSubmit }) => {
  const notify = () =>
    toast("Good Job!", {
      icon: "👏",
    });

  const handleSubmit = (values, actions) => {
    if (values.searchTerm === "") {
      notify();
      alert("Enter value")
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
      </Form>
    </Formik>
  );
};

export default SearchBar;
