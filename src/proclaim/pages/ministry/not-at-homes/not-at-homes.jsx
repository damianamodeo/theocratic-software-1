import { useContext } from "react";
import { Content } from "../../../../common/components/containers/content";
import { Header } from "../../../../common/components/containers/header";
import { Page } from "../../../../common/components/containers/page";
import { Callback } from "./callback";
import { Letters } from "./letters";
import { Personal } from "./personal";
import { Maps } from "./maps";
// import { HeaderContext } from "@contexts/header.jsx";

export const NotAtHomes = ({ userID, active }) => {
  // const {title} = useContext(HeaderContext);
  return (
    <Page>
      <Header>
        <div className="text-center grow">{active}</div>
      </Header>
      <Content>
        <div className={`${active === "Personal" ? "visible" : "hidden"}`}>
          <Personal userID={userID} />
        </div>
        <div className={`${active === "Combined" ? "visible" : "hidden"}`}>
          <Callback userID={userID} />
        </div>
        <div className={`${active === "Letters" ? "visible" : "hidden"}`}>
          <Letters userID={userID} />
        </div>
        <div className={`${active === "Maps" ? "visible" : "hidden"}`}>
          <Maps userID={userID} />
        </div>
      </Content>
    </Page>
  );
};
