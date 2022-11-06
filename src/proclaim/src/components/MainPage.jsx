import { useContext, useEffect, useState } from "react";
import { Navbar } from "../../../common/components/containers/navbar";
import { NavbarIcon } from "../../../common/components/containers/navbar-icon";
import { Ministry } from "./pages/ministry/Ministry";
import { Header } from "../../../common/components/containers/header.tsx";
import { HeaderContext, UserIDContext } from "../services/context/mainContext.jsx";
import { PageContext } from "../services/context/notAtHomesContext";
import { idb } from "../services/indexedDB/dexie";

export const MainPage = () => {
  const [active, setActive] = useState("Personal");
  const { header, setHeader } = useContext(HeaderContext);
  const { page, setPage } = useContext(PageContext);
  const {userID, setUserID} = useContext(UserIDContext);

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
      <div className="flex flex-col grow overflow-hidden">
        <Header>
          <div className="text-center grow">{header}</div>
        </Header>
        <div className="flex flex-col grow overflow-hidden w-screen">
          <div
            className={`${
              active !== "Ministry" ? "visible" : "hidden"
            } grow overflow-auto`}
          >
            <Ministry />
          </div>
        </div>
      </div>
      <Navbar>
        <div
          className={`basis-1/3`}
          onClick={() => {
            setHeader("Personal List");
            setPage("PersonalList");
          }}
        >
          <NavbarIcon
            title="Personal"
            active={active}
            setActive={setActive}
          ></NavbarIcon>
        </div>
        <div
          className={`basis-1/3`}
          onClick={() => {
            setHeader("Call Back List");
            setPage("CallBackList");
          }}
        >
          <NavbarIcon
            title="Combined"
            active={active}
            setActive={setActive}
          ></NavbarIcon>
        </div>
        <div
          className={`basis-1/3`}
          onClick={() => {
            setHeader("Letter Writing List");
            setPage("LettersList");
          }}
        >
          <NavbarIcon
            title="Letters"
            active={active}
            setActive={setActive}
          ></NavbarIcon>
        </div>
      </Navbar>
    </div>
  );
};
