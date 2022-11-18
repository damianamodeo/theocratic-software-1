import { useState } from "react";
import { Button } from "../../../../../../common/components/inputs/button";
import { TextInput } from "../../../../../../common/components/inputs/text";
import { idb } from "../../../../services/indexedDB/dexie";

export const EnterCongregationDetails = () => {
  const [congregationDetails, setCongregationDetails] = useState({
    firstName: "",
    lastName: "",
  });

  const addCongregationDetails = async (congregationDetails) => {
    console.log("🚀 ~ file: EnterCongregationDetails.jsx ~ line 13 ~ addCongregationDetails ~ congregationDetails", congregationDetails)
    try {
      await idb.congregation.add(congregationDetails);
    } catch (error) {
      console.log(error);
    }
    setPage("AddCongregation");
  };

  return (
    <div>
      <TextInput
        label="Name"
        value={congregationDetails.name}
        action={(e) => {
          setCongregationDetails({
            ...congregationDetails,
            name: e.target.value,
          });
        }}
      ></TextInput>
      Address
      <TextInput
        label="Number"
        value={congregationDetails.addressNumber}
        action={(e) => {
          setCongregationDetails({
            ...congregationDetails,
            addressNumber: e.target.value,
          });
        }}
      ></TextInput>
      <TextInput
        label="Street"
        value={congregationDetails.street}
        action={(e) => {
          setCongregationDetails({
            ...congregationDetails,
            street: e.target.value,
          });
        }}
      ></TextInput>
      <TextInput
        label="Suburb"
        value={congregationDetails.suburb}
        action={(e) => {
          setCongregationDetails({
            ...congregationDetails,
            suburb: e.target.value,
          });
        }}
      ></TextInput>
      <TextInput
        label="State"
        value={congregationDetails.state}
        action={(e) => {
          setCongregationDetails({
            ...congregationDetails,
            state: e.target.value,
          });
        }}
      ></TextInput>
      <TextInput
        label="Country"
        value={congregationDetails.country}
        action={(e) => {
          setCongregationDetails({
            ...congregationDetails,
            country: e.target.value,
          });
        }}
      ></TextInput>
      <div className="p-4">
        <Button action={() => addCongregationDetails(congregationDetails)}>
          Submit
        </Button>
      </div>
    </div>
  );
};
