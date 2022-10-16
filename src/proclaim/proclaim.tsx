import { createContext, useState } from "react";
import { Navbar } from "../common/components/containers/navbar";
import { NavbarIcon } from "../common/components/containers/navbar-icon";
import { NotAtHomes } from "./pages/ministry/not-at-homes/not-at-homes";
import { getUserID } from "src/proclaim/services/indexedDB/getUserID.js"


export const Proclaim = () => {
  const userDetails = createContext("")
  const [active, setActive] = useState("Personal");
  const [userID, setUserID] = useState("");
  getUserID().then((item) => {
    setUserID(item.userID);
  });
  return (
    <div className="flex flex-col h-screen font-noto">
      <>
        <NotAtHomes></NotAtHomes>
        <Navbar>
          <NavbarIcon
            title="Personal"
            active={active}
            setActive={setActive}
          ></NavbarIcon>
          <NavbarIcon
            title="Call Back"
            active={active}
            setActive={setActive}
          ></NavbarIcon>
          <NavbarIcon
            title="Letters"
            active={active}
            setActive={setActive}
          ></NavbarIcon>
        </Navbar>
      </>
    </div>
  );
};
