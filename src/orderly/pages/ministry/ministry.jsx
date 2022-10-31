import { NotAtHomesContext } from "../../../common/pages/ministry/notAtHomes/context";
import { NotAtHomes } from "./notAtHomes/notAtHomes";

export const Ministry = ({ active }) => {
  return (
    <NotAtHomesContext>
      <div className={`${active === "Ministry" ? "visible" : "hidden"}`}>
        <NotAtHomes />
      </div>
    </NotAtHomesContext>
  );
};
