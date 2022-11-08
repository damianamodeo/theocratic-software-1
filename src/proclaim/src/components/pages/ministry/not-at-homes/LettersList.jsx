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
      <div className="text-center font-bold py-4">
        There are
        {` ${
          Object.keys(addresses).filter((id) => {
            const address = addresses[id];
            if (id === "cong" || id === "id" || !address.letter) {
              return false;
            }
            return true;
          }).length
        } `}
        addresses to write to
      </div>
      <div className="text-center text-sm text-secondary pb-4 mx-12">
        Tap on address and select "Letter Sent" to remove address from list
      </div>
      {Object.keys(addresses)
        .filter((id) => {
          const address = addresses[id];
          if (id === "cong" || id === "id" || !address.letter) {
            return false;
          }
          return true;
        })
        .sort()
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
              {`${address.mapNumber} - ${address.suburb} - ${address.street} - ${address.unitNumber ? `${address.unitNumber}/` : ""}${
                address.houseNumber
              }`}
            </div>
          );
        })}
    </>
  );
};
