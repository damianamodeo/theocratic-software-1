import { useContext } from "react";
import {
  PageContext,
  AddressContext,
} from "../../../../services/context/notAtHomesContext";
import { Button } from "../../../../../../common/components/inputs/button.jsx";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { fdb } from "../../../../../../common/services/firebase/config";

export const LettersForm = ({ addresses }) => {
  const { page, setPage } = useContext(PageContext);
  const { address, setAddress } = useContext(AddressContext);

  const remove = async () => {
    setPage("LettersList");
    const document = doc(fdb, "notAtHomes", "MaitlandCongregation");
    const obj = {};
    obj[address] = deleteField();
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
      <Button action={() => remove()}>Letter Sent</Button>
      <Button action={() => setPage("LettersList")}>Back</Button>
    </div>
  );
};
