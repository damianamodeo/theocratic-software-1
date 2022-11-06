import { useContext, useState } from "react";
import { Navbar } from "../common/components/containers/navbar";
import { NavbarIcon } from "../common/components/containers/navbar-icon";
import { Ministry } from "./pages/ministry/ministry";
import { Header } from "../common/components/containers/header.tsx";
import { HeaderContent } from "./context";

export const Navigation = () => {
  const [active, setActive] = useState("Ministry");
  const { headerContent, setHeaderContent } = useContext(HeaderContent);

  return (
    <div className="flex flex-col h-screen font-noto">
      <>
        <div className="flex flex-col grow overflow-hidden">
          <Header>
            <div className="text-center grow">{headerContent}</div>
          </Header>
          <div className="grow overflow-auto">
            <Ministry active={active} />
          </div>
        </div>
        <Navbar>
          <NavbarIcon
            title="Personal"
            active={active}
            setActive={setActive}
          ></NavbarIcon>
          <NavbarIcon
            title="Ministry"
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
