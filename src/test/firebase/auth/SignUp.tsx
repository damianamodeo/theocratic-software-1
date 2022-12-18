import { auth } from "@FIREBASE/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const SignUp = async ({ email, password }) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};
