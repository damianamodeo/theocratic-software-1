import { useContext } from "react";
import { Button } from "../../../../../../common/components/inputs/button";
import {
  PageContext,
  AddressContext,
  AddressFormContext,
} from "../../../../services/context/notAtHomesContext";
import {
  HeaderContext,
  UserIDContext,
} from "../../../../services/context/mainContext.jsx";

export const PersonalList = ({ addresses }) => {
  const { page, setPage } = useContext(PageContext);
  const { address, setAddress } = useContext(AddressContext);
  const { addressForm, setAddressForm } = useContext(AddressFormContext);
  const { header, setHeader } = useContext(HeaderContext);
  const { userID, setUserID } = useContext(UserIDContext);

  return (
    <>
      <div className="py-6">
        <Button
          action={() => {
            setPage("PersonalAdd");
            setHeader("Add New Address");
            setAddressForm({
              ...addressForm,
              houseNumber: "",
              unitNumber: "",
            });
          }}
        >
          Add
        </Button>
      </div>
      <div className="text-center font-bold pb-4">
        You currently have
        {` ${
          Object.keys(addresses).filter((id) => {
            const address = addresses[id];
            if (
              id === "cong" ||
              id === "id" ||
              address.letter ||
              address.user !== userID
            ) {
              return false;
            }
            return true;
          }).length
        } `}
        active addresses
      </div>
      {Object.keys(addresses)
        .filter((id) => {
          const address = addresses[id];
          if (
            id === "cong" ||
            id === "id" ||
            address.letter ||
            address.user !== userID
          ) {
            return false;
          }
          return true;
        })
        .sort(function (a, b) {
          return addresses[b].id > addresses[a].id ? 1 : -1;
        })
        .map(function (id) {
          const address = addresses[id];
          return (
            <div
              key={id}
              className="p-4 text-sm font-normal align-middle border"
              onClick={() => {
                setAddress(id);
                setAddressForm(addresses[id]);
                setHeader("Edit Address");
                setPage("PersonalUpdate");
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
