import { createContext, useContext, useState } from "react";
import { Navbar } from "../common/components/containers/navbar";
import { NavbarIcon } from "../common/components/containers/navbar-icon";
import { NotAtHomes } from "./pages/ministry/not-at-homes/not-at-homes";
import { idb } from "./services/indexedDB/dexie";

export const Proclaim = () => {
  const [active, setActive] = useState("Personal");
  const [userID, setUserID] = useState("");
  const getUserID = async () => {
    const item = await idb.settings.get(1);
    if (item == undefined) {
      idb.settings.add({ id: 1, userID: Date.now() });
      return await idb.settings.get(1);
    } else {
      return item;
    }
  };
  getUserID().then((item) => {
    setUserID(item.userID);
  });
  return (
    <div className="flex flex-col h-screen font-noto">
      <>
        <NotAtHomes userID={userID} active={active}></NotAtHomes>
        <Navbar>
          <NavbarIcon
            title="Personal"
            active={active}
            setActive={setActive}
          ></NavbarIcon>
          <NavbarIcon
            title="Combined"
            active={active}
            setActive={setActive}
          ></NavbarIcon>
          <NavbarIcon
            title="Letters"
            active={active}
            setActive={setActive}
          ></NavbarIcon>
          {/* <NavbarIcon
            title="Maps"
            active={active}
            setActive={setActive}
          ></NavbarIcon> */}
        </Navbar>
      </>
    </div>
  );
};
