import { auth } from "@FIREBASE/config";
import { useState } from "react";

export const AuthState = () => {
  const [user, setUser] = useState({});

  auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });
  return <div>{user?.email ? user.email : "Logged Out"}</div>;
};
