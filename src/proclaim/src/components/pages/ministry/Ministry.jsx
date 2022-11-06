import { useContext } from "react";
import { HeaderContext } from "../../../services/context/mainContext.jsx";
import { NotAtHomes } from "./not-at-homes/NotAtHomes";

export const Ministry = ({ userID, active }) => {
  const { title } = useContext(HeaderContext);
  return (
    <div className="flex flex-col grow overflow-hidden">
      <div>
          <NotAtHomes></NotAtHomes>
      </div>
    </div>
  );
};
