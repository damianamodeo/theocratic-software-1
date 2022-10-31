import { useContext } from "react";
import {
  PageContext,
  AddressContext,
} from "../../../../common/pages/ministry/notAtHomes/context";

export const HouseNumbers = ({ suburb, street, addresses }) => {
  const { address, setAddress } = useContext(AddressContext);
  const {page, setPage} = useContext(PageContext)
  const editAddress = (id) => {
    setAddress(addresses[id])
    setPage("test")
  };

  return (
    <div className="pt-4 text-2xl text-left grid grid-cols-4 gap-2">
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
            return addresses[a].houseNumber > addresses[b].houseNumber ? 1 : -1;
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
              className="py-4 text-lg align-middle text-center bg-bg "
              onClick={() => {
                editAddress(id);
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
