import { useContext } from "react";
import {
  PageContext,
  AddressContext,
} from "../../../../../services/context/notAtHomesContext";
import { Button } from "../../../../../../../common/components/inputs/button.jsx";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { fdb } from "../../../../../../../common/services/firebase/config";

export const CallBackForm = ({ addresses }) => {
  const { page, setPage } = useContext(PageContext);
  const { address, setAddress } = useContext(AddressContext);

  const remove = async () => {
    setPage("CallBackList");
    const document = doc(fdb, "notAtHomes", "MaitlandCongregation");
    const obj = {};
    obj[address] = deleteField();
    await updateDoc(document, obj);
  };

  const update = async () => {
    setPage("CallBackList");
    const document = doc(fdb, "notAtHomes", "MaitlandCongregation");
    const obj = {};
    const newAddress = {
      id: addresses[address].id,
      user: addresses[address].user,
      mapNumber: addresses[address].mapNumber || "",
      suburb: addresses[address].suburb,
      street: addresses[address].street,
      houseNumber: addresses[address].houseNumber,
      unitNumber: addresses[address].unitNumber || "",
      letter: true,
    };
    obj[address] = newAddress;
    await updateDoc(document, obj);
  };

  return (
    <div className="grid gap-8 mt-8">
      {addresses[address] !== undefined ? (
        <div className="text-center text-lg">
          {addresses[address].unitNumber
            ? `${addresses[address].unitNumber}/`
            : null}
          {addresses[address].houseNumber} {addresses[address].street}
          {", "}
          {addresses[address].suburb}
        </div>
      ) : null}
      <Button action={() => remove()}>Home</Button>
      <Button action={() => update()}>Not Home</Button>
      <Button action={() => setPage("CallBackList")}>Back</Button>
    </div>
  );
};
