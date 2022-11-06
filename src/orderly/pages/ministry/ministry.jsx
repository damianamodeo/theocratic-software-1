import { NotAtHomes } from "../../../common/pages/ministry/notAtHomes/main.jsx";

export const Ministry = ({ active }) => {
  return (
    <div className={`${active === "Ministry" ? "visible" : "hidden"}`}>
      <NotAtHomes />
    </div>
  );
};
