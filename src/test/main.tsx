import { SignUpForm } from "@test-firebase/auth/SignUpForm";
import { CreateNewCollection } from "@test-firebase/firestore/CreateNewCollection";
import ReactDOM from "react-dom/client";
import "../../src/common/styles/index.css";
import { LogInForm } from "@test-firebase/auth/LogInForm";
import { LogIn } from "@test-firebase/auth/LogIn";
import { LogOut } from "@test-firebase/auth/LogOut";
import { auth } from "@FIREBASE/config";
import { AuthState } from "@test-firebase/auth/AuthState";
import { SetRoles } from "@test-firebase/auth/SetRoles";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className={"p-8"}>
    <SetRoles></SetRoles>
    <AuthState></AuthState>
    <SignUpForm></SignUpForm>
    <LogInForm></LogInForm>
    <LogOut></LogOut>
  </div>
);
