import { useState } from "react";
import { Navbar } from "../common/components/containers/navbar";
import { NavbarIcon } from "../common/components/containers/navbar-icon";
import { NotAtHomes } from "./pages/ministry/not-at-homes/not-at-homes";

export const Proclaim = () => {
  const [active, setActive] = useState("Personal");
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
