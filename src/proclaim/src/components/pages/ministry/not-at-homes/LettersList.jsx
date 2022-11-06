import { useContext } from "react";
import {
  PageContext,
  AddressContext,
} from "../../../../services/context/notAtHomesContext";

export const LettersList = ({ addresses }) => {
  const { address, setAddress } = useContext(AddressContext);
  const { page, setPage } = useContext(PageContext);
  const editAddress = (id) => {
    setAddress(id);
    setPage("LettersForm");
  };
  return (
    <>
      {Object.keys(addresses)
        .filter((id) => {
          const address = addresses[id];
          if (id === "cong" || id === "id" || !address.letter) {
            return false;
          }
          return true;
        })
        .sort(function (a, b) {
          if (addresses[a].houseNumber !== addresses[b].houseNumber) {
            return parseInt(addresses[a].houseNumber) >
              parseInt(addresses[b].houseNumber)
              ? 1
              : -1;
          }
          return parseInt(addresses[b].unitNumber) <
            parseInt(addresses[a].unitNumber)
            ? 1
            : -1;
        })
        .map(function (id) {
          const address = addresses[id];
          return (
            <div
              key={id}
              className="p-4 text-sm font-normal align-middle border"
              onClick={() => {
                editAddress(id);
              }}
            >
              {`${address.unitNumber ? `${address.unitNumber}/` : ""}${
                address.houseNumber
              } ${address.street}, ${address.suburb} (${address.mapNumber})`}
            </div>
          );
        })}
    </>
  );
};
