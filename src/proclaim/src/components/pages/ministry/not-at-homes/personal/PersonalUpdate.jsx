import { useContext } from "react";
import {
  PageContext,
  AddressContext,
  AddressFormContext,
} from "../../../../../services/context/notAtHomesContext";
import { Button } from "../../../../../../../common/components/inputs/button.jsx";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { fdb } from "../../../../../../../common/services/firebase/config";
import { AddressForm } from "../form/AddressForm";
import { HeaderContext } from "../../../../../services/context/mainContext.jsx";

export const PersonalUpdate = ({ addresses }) => {
  const { page, setPage } = useContext(PageContext);
  const { address, setAddress } = useContext(AddressContext);
  const { addressForm, setAddressForm } = useContext(AddressFormContext);
  const { header, setHeader } = useContext(HeaderContext);

  const update = async ({letter}) => {
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
    obj[address] = {
      ...addresses[address],
      id: Date.now(),
      mapNumber: addressForm.mapNumber || "",
      suburb: addressForm.suburb.trim(),
      street: addressForm.street.trim(),
      houseNumber: addressForm.houseNumber,
      unitNumber: addressForm.unitNumber || "",
      lat: geoCode.results[0].geometry.location.lat,
      lng: geoCode.results[0].geometry.location.lng,
      letter: letter
    };
    await updateDoc(document, obj);
  };

  const remove = async () => {
    setPage("PersonalList");
    setHeader("Personal");
    const document = doc(fdb, "notAtHomes", "MaitlandCongregation");
    const obj = {};
    obj[address] = deleteField();
    await updateDoc(document, obj);
  };

  return (
    <div className="grid gap-4 mt-8">
      <AddressForm />

      <div className="flex gap-2 w-screen p-2">
        <Button action={() => remove()}>Delete</Button>
        <Button action={() => update({letter: false})}>Update</Button>
      </div>
      <div className="flex gap-2 w-screen p-2">
        <Button action={() => update({letter: true})}>Letter</Button>
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
