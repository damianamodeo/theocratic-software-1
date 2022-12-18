import { auth } from "@FIREBASE/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const LogIn = async ({ email, password }) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};
