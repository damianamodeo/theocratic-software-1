import { useContext } from "react";
import { HeaderContext } from "../services/context/mainContext";
import { Initialise } from "./pages/initialise/Initialise";
import { Navbar } from "../../../common/components/containers/navbar";
import { NavbarIcon } from "../../../common/components/containers/navbar-icon";
import { Header } from "../../../common/components/containers/header.tsx";
import { idb } from "../services/indexedDB/dexie";
import { useState } from "react";

const initialSettings = await idb.settings.get(1);

export const MainPage = () => {
  const { header, setHeader } = useContext(HeaderContext);
  const [active, setActive] = useState("Publishers");

  return (
    <>
      {initialSettings === undefined ? (
        <Initialise></Initialise>
      ) : (
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
                {/* <Initialise /> */}
              </div>
            </div>
          </div>
          <Navbar>
            <div
              className={`basis-1/2`}
              onClick={() => {
                setHeader("Publishers");
              }}
            >
              <NavbarIcon
                title="Publishers"
                active={active}
                setActive={setActive}
              ></NavbarIcon>
            </div>
            <div
              className={`basis-1/2`}
              onClick={() => {
                setHeader("Settings");
              }}
            >
              <NavbarIcon
                title="Settings"
                active={active}
                setActive={setActive}
              ></NavbarIcon>
            </div>
          </Navbar>
        </div>
      )}
    </>
  );
};
