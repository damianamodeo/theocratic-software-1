import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Submit } from "@INPUTS/Submit";
import { FormikInput } from "@INPUTS/FormikInput";
import { auth } from "@FIREBASE/config";
import { SignUp } from "@test-firebase/auth/SignUp";

export const SignUpForm = () => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    SignUp(values);
  };

  return (
    <>
      <div className="uppercase font-bold text-center m-8">Create Account</div>
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
            <FormikInput
              inputType="text"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
            />
            <Submit>Create Account</Submit>
          </div>
        </Form>
      </Formik>
    </>
  );
};
