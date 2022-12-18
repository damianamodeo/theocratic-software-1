import { Text } from "@INPUTS/formik/Text";
import { TextArea } from "@INPUTS/formik/TextArea";

export const FormikInput = ({ inputType, ...rest }) => {
  switch (inputType) {
    case "text":
      return <Text {...rest} />;
    case "email":
      return <Text {...rest} />;
    case "tel":
      return <Text {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    default:
      return null;
  }
};
