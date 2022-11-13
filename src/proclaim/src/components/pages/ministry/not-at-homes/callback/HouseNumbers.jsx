import { useContext } from "react";
import {
  PageContext,
  AddressContext,
} from "../../../../../services/context/notAtHomesContext";

export const HouseNumbers = ({ suburb, street, addresses }) => {
  const { address, setAddress } = useContext(AddressContext);
  const {page, setPage} = useContext(PageContext)
  const editAddress = (id) => {
    setAddress(id)
    setPage("CallBackForm")
  };

  return (
    <div className="m-2 text-black text-2xl text-left grid grid-cols-5 gap-2">
      {Object.keys(addresses)
        .filter((id) => {
          const address = addresses[id];
          if (
            id === "cong" ||
            id === "id" ||
            suburb !== address.suburb ||
            street !== address.street ||
            address.letter
          ) {
            return false;
          }
          return true;
        })
        .sort(function (a, b) {
          if (addresses[a].houseNumber !== addresses[b].houseNumber) {
            return parseInt(addresses[a].houseNumber) > parseInt(addresses[b].houseNumber) ? 1 : -1;
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
              className="py-2 text-sm font-normal align-middle text-center bg-bg "
              onClick={() => {
                setAddress(id)
                setPage("CallBackForm")
              }}
            >
              {address.unitNumber ? `${address.unitNumber}-` : ""}
              {address.houseNumber}
            </div>
          );
        })}
    </div>
  );
};
