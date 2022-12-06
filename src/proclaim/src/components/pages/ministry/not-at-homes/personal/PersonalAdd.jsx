import { useContext } from "react";
import {
  PageContext,
  AddressContext,
  AddressFormContext,
} from "../../../../../services/context/notAtHomesContext";
import { Button } from "@inputs/Button";
import { doc, updateDoc } from "firebase/firestore";
import { fdb } from "../../../../../../../common/services/firebase/config";
import { AddressForm } from "../form/AddressForm";
import {
  HeaderContext,
  UserIDContext,
} from "../../../../../services/context/mainContext.jsx";
import { toTitleCase } from "../../../../../../../common/services/formatting/titleCase";
import { ButtonLongPress } from "../../../../../../../common/components/inputs/ButtonLongPress";

export const PersonalAdd = ({ addresses }) => {
  const { userID, setUserID } = useContext(UserIDContext);
  const { page, setPage } = useContext(PageContext);
  const { address, setAddress } = useContext(AddressContext);
  const { addressForm, setAddressForm } = useContext(AddressFormContext);
  const { header, setHeader } = useContext(HeaderContext);

  const add = async ({ letter }) => {
    setPage("PersonalList");
    setHeader("Personal");
    const geoCode = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${
        addressForm.houseNumber
      }+${addressForm.street.trim().replace(/ /g, "+")},+${addressForm.suburb
        .trim()
        .replace(/ /g, "+")},+NSW&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    const document = doc(fdb, "notAtHomes", "MaitlandCongregation");
    const obj = {};
    const id = "id" + Date.now();
    obj[id] = {
      id: Date.now(),
      user: userID,
      mapNumber: addressForm.mapNumber || "N/A",
      suburb: toTitleCase(addressForm.suburb.trim()),
      street: toTitleCase(addressForm.street.trim()),
      houseNumber: Number(addressForm.houseNumber),
      unitNumber: addressForm.unitNumber || "",
      lat: geoCode.results[0].geometry.location.lat,
      lng: geoCode.results[0].geometry.location.lng,
      letter: letter,
    };
    await updateDoc(document, obj);
    setAddress(id);
  };

  return (
    <div className="grid gap-8 mt-4">
      <AddressForm />
      <div className="flex flex-col gap-4 w-screen p-2">
        <ButtonLongPress action={() => add({ letter: true })}>
          Letter List
        </ButtonLongPress>
        <ButtonLongPress action={() => add({ letter: false })}>
          Callback List
        </ButtonLongPress>
        <Button
          action={() => {
            setHeader("Personal");
            setPage("PersonalList");
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};
