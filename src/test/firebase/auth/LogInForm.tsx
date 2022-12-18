import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Submit } from "@INPUTS/Submit";
import { FormikInput } from "@INPUTS/FormikInput";
import { LogIn } from "@test-firebase/auth/LogIn";

export const LogInForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    LogIn(values)
  };

  return (
    <>
      <div className="uppercase font-bold text-center m-8">Log In</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="grid gap-4 mx-auto max-w-md">
            <FormikInput
              inputType="text"
              type="email"
              label="Email"
              name="email"
            />
            <FormikInput
              inputType="text"
              type="password"
              label="Password"
              name="password"
            />
            <Submit>Log In</Submit>
          </div>
        </Form>
      </Formik>
    </>
  );
};
