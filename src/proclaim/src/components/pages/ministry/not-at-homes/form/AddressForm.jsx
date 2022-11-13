import { AddressFormContext } from "../../../../../services/context/notAtHomesContext";
import { TextInput } from "../../../../../../../common/components/inputs/text";
import { NumberInput } from "../../../../../../../common/components/inputs/number";
import { useContext } from "react";

export const AddressForm = () => {
  const { addressForm, setAddressForm } = useContext(AddressFormContext);

  return (
    <>
      <div className="flex gap-2">
        <div className="basis-2/5 px-2">
          <NumberInput
            action={(e) => {
              setAddressForm({ ...addressForm, mapNumber: e.target.value });
            }}
            label="Map"
            value={addressForm.mapNumber}
          ></NumberInput>
        </div>
        <div className="basis-3/5 px-2">
          <TextInput
            action={(e) => {
              setAddressForm({
                ...addressForm,
                suburb: e.target.value,
              });
            }}
            label="Suburb"
            value={addressForm.suburb}
          ></TextInput>
        </div>
      </div>
      <div className="flex">
        <div className="basis-1/5 px-2">
          <TextInput
            action={(e) => {
              setAddressForm({ ...addressForm, unitNumber: e.target.value });
            }}
            label="Unit"
            value={addressForm.unitNumber}
          ></TextInput>
        </div>
        <div className="basis-1/5 px-2">
          <NumberInput
            action={(e) => {
              setAddressForm({ ...addressForm, houseNumber: e.target.value });
            }}
            label="House"
            value={addressForm.houseNumber}
          ></NumberInput>
        </div>
        <div className="basis-3/5 px-2">
          <TextInput
            action={(e) => {
              setAddressForm({
                ...addressForm,
                street: e.target.value,
              });
            }}
            label="Street"
            value={addressForm.street}
          ></TextInput>
        </div>
      </div>
    </>
  );
};
