import { useContext } from "react";
import {
  PageContext,
  AddressContext,
  AddressFormContext,
} from "../../../../services/context/notAtHomesContext";
import { Button } from "../../../../../../common/components/inputs/button.jsx";
import { doc, updateDoc } from "firebase/firestore";
import { fdb } from "../../../../../../common/services/firebase/config";
import { AddressForm } from "./AddressForm";
import { HeaderContext, UserIDContext } from "../../../../services/context/mainContext.jsx";

export const PersonalAdd = ({ addresses }) => {
  const {userID, setUserID} = useContext(UserIDContext);
  const { page, setPage } = useContext(PageContext);
  const { address, setAddress } = useContext(AddressContext);
  const { addressForm, setAddressForm } = useContext(AddressFormContext);
  const { header, setHeader } = useContext(HeaderContext);

  const add = async () => {
    setPage("PersonalList");
    setHeader("Personal");
    const document = doc(fdb, "notAtHomes", "MaitlandCongregation");
    const obj = {};
    const id = "id" + Date.now();
    obj[id] = {
      id: Date.now(),
      user: userID,
      mapNumber: addressForm.mapNumber || 0,
      suburb: addressForm.suburb.trim(),
      street: addressForm.street.trim(),
      houseNumber: Number(addressForm.houseNumber),
      unitNumber: addressForm.unitNumber || "",
    };
    await updateDoc(document, obj);
    setAddressForm({ ...addressForm, houseNumber: "", unitNumber: "" });
    setAddress(id);
  };

  return (
    <div className="grid gap-8 mt-8">
      <AddressForm />

      <div className="flex gap-2 w-screen p-2">
        <Button
          action={() => {
            setHeader("Personal");
            setPage("PersonalList");
          }}
        >
          Back
        </Button>
        <Button action={() => add()}>Submit</Button>
      </div>
    </div>
  );
};
