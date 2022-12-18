import { auth } from "@FIREBASE/config";
import { Button } from "@INPUTS/Button";
import { getFunctions, httpsCallable } from "firebase/functions";

export const SetRoles = () => {
  const functions = getFunctions();
  const setRoles = httpsCallable(functions, "setRoles");

  return (
    <Button
      action={() =>
        setRoles({ cong: "Maitland", email: "damianamodeo@gmail.com" })
      }
    >
      Set Roles
    </Button>
  );
};
