import { auth } from "@FIREBASE/config";
import { Button } from "@INPUTS/Button";
import { signOut } from "firebase/auth";

export const LogOut = () => {
  
  const logout = async () => {
    const result = await signOut(auth);
    console.log(result)
  };

  return <Button action={logout}>Log Out</Button>;
};
