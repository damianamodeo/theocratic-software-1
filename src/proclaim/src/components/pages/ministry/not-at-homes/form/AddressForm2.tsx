import { AddressFormContext } from "../../../../../services/context/notAtHomesContext";
import { useContext } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikInput } from "@INPUTS/FormikInput";
import { Submit } from "@INPUTS/Submit";
import { Button } from "@INPUTS/Button";

export const AddressForm = ({ backButton }) => {
  const { addressForm, setAddressForm } = useContext(AddressFormContext);
  const initialValues = {
    mapNumber: "",
    suburb: "",
    untiNumber: "",
    houseNumber: "",
    street: "",
    submitAction: "",
  };

  const validationSchema = Yup.object({
    suburb: Yup.string().required("Required"),
    street: Yup.string().required("Required"),
    houseNumber: Yup.string().required("Required"),
  });

  const onSubmit = async (values: any) => {
    if (values.submitAction === "Combined List") {
      console.log("Combined List");
      return;
    }
    console.log("Letter List");
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => {
          return (
            <Form>
              <div className="max-w-[400px] mx-auto">
                <div className="flex gap-2">
                  <div className="basis-2/5 px-2 ">
                    <FormikInput
                      inputType="text"
                      type="text"
                      label="Map"
                      name="mapNumber"
                    />
                  </div>
                  <div className="basis-3/5 px-2 ">
                    <FormikInput
                      inputType="text"
                      type="text"
                      label="Suburb"
                      name="suburb"
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="basis-1/5 px-2">
                    <FormikInput
                      inputType="text"
                      type="text"
                      label="Unit"
                      name="unitNumber"
                    />
                  </div>
                  <div className="basis-1/5 px-2">
                    <FormikInput
                      inputType="text"
                      type="text"
                      label="House"
                      name="houseNumber"
                    />
                  </div>
                  <div className="basis-3/5 px-2">
                    <FormikInput
                      inputType="text"
                      type="text"
                      label="Street"
                      name="street"
                    />
                  </div>
                </div>
                <div className="grid gap-4 my-4">
                  <Submit
                    action={() =>
                      setFieldValue("submitAction", "Combined List")
                    }
                  >
                    Combined List
                  </Submit>
                  <Submit
                    action={() => setFieldValue("submitAction", "Letter List")}
                  >
                    Letter List
                  </Submit>
                  <Button action={backButton}>Back</Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
