import { Error } from "@INPUTS/formik/Error";
import { ErrorMessage, Field } from "formik";
import { style } from "../style";

export const TextArea = ({ label, name, ...rest }) => {
  return (
    <>
      <div className="relative">
        <label htmlFor={label} className={style.label}>
          {label}
        </label>
        <Field className={style.input} as="textarea" name={name} {...rest} />
        <ErrorMessage name={name} component={Error}></ErrorMessage>
      </div>
    </>
  );
};
