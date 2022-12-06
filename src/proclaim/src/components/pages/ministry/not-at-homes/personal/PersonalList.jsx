import { useContext } from "react";
import { Button } from "../../../../../../../common/components/inputs/Button";
import {
  PageContext,
  AddressContext,
  AddressFormContext,
} from "../../../../../services/context/notAtHomesContext";
import {
  HeaderContext,
  UserIDContext,
} from "../../../../../services/context/mainContext.jsx";
import { PersonalMap } from "./PersonalMap";
import { LongPress } from "../../../../../../../common/components/inputs/LongPress";

export const PersonalList = ({ addresses }) => {
  const { page, setPage } = useContext(PageContext);
  const { address, setAddress } = useContext(AddressContext);
  const { addressForm, setAddressForm } = useContext(AddressFormContext);
  const { header, setHeader } = useContext(HeaderContext);
  const { userID, setUserID } = useContext(UserIDContext);

  return (
    <>
      <div className="py-6">
        <div className="text-center text-sm text-secondary uppercase pb-4 mx-12">
          Please note you now need to press and hold to activate some buttons
        </div>
        <Button
          action={() => {
            setPage("PersonalAdd");
            setHeader("Add New Address");
            setAddressForm({
              ...addressForm,
              houseNumber: addressForm.unitNumber
                ? addressForm.houseNumber
                : "",
              unitNumber: "",
            });
          }}
        >
          Add
        </Button>
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
        .map(function (id, index) {
          const address = addresses[id];
          return (
            <div
              className={`align-middle border ${
                index === 0
                  ? "font-bold text-center pb-4"
                  : "p-4 text-sm font-normal"
              }`}
              key={id}
              onClick={() => {
                setAddress(id);
                setAddressForm(addresses[id]);
                setHeader("Edit Address");
                setPage("PersonalUpdate");
              }}
            >
              {index === 0 && (
                <div className="h-[40vh] pb-6 w-full">
                  <PersonalMap
                    position={{
                      lat: addresses[id].lat,
                      lng: addresses[id].lng,
                    }}
                  ></PersonalMap>
                </div>
              )}
              {`${address.suburb} - ${
                address.unitNumber ? `${address.unitNumber}/` : ""
              }${address.houseNumber} ${address.street} - (Map ${
                address.mapNumber
              })`}
            </div>
          );
        })}
    </>
  );
};
