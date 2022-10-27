import { useContext } from "react";
import { Content } from "../../../../common/components/containers/content";
import { Header } from "../../../../common/components/containers/header";
import { Page } from "../../../../common/components/containers/page";
import { Callback } from "./callback";
import { Letters } from "./letters";
import { Personal } from "./personal";
import { HeaderContext } from "../../../services/contexts/header.jsx";

export const NotAtHomes = ({ userID, active }) => {
  const {title} = useContext(HeaderContext);
  return (
    <Page>
      <Header>
        <div className="text-center grow">{title}</div>
      </Header>
      <div>
        <div className={`${active === "Personal" ? "visible" : "hidden"}`}>
          <Personal userID={userID} />
        </div>
        <div className={`${active === "Combined" ? "visible" : "hidden"}`}>
          <Callback userID={userID} />
        </div>
        <div className={`${active === "Letters" ? "visible" : "hidden"}`}>
          <Letters userID={userID} />
        </div>
      </div>
    </Page>
  );
};
