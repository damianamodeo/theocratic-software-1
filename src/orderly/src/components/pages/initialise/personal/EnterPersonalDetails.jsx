import { useState } from "react";
import { idb } from "../../../../services/indexedDB/dexie";
import { Button } from "../../../../../../common/components/inputs/button";
import { TextInput } from "../../../../../../common/components/inputs/text";

export const EnterPersonalDetails = ({ setPage }) => {
  const [publisherDetails, setPublisherDetails] = useState({
    firstName: "",
    lastName: "",
  });

  const addPublisherDetails = async (publisherDetails) => {
    try {
      await idb.settings.add({
        firstName: publisherDetails.firstName,
        lastName: publisherDetails.lastName,
      });
    } catch (error) {
      console.log(error);
    }
    setPage("AddCongregation");
  };

  return (
    <div>
      <TextInput
        label="First Name"
        value={publisherDetails.firstName}
        action={(e) => {
          setPublisherDetails({
            ...publisherDetails,
            firstName: e.target.value,
          });
        }}
      ></TextInput>
      <TextInput
        label="Last Name"
        value={publisherDetails.lastName}
        action={(e) => {
          setPublisherDetails({
            ...publisherDetails,
            lastName: e.target.value,
          });
        }}
      ></TextInput>
      <div className="p-4">
        <Button action={() => addPublisherDetails(publisherDetails)}>
          Submit
        </Button>
      </div>
    </div>
  );
};
