import { Button } from "../../../../common/components/inputs/button";
import { fdb } from "../../../../common/services/firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  arrayUnion,
  deleteField
} from "firebase/firestore";
import { useState } from "react";
import { TextInput } from "../../../../common/components/inputs/text";
import { NumberInput } from "../../../../common/components/inputs/number";
import { toTitleCase } from "../../../../common/services/formatting/titleCase";

export const Form = ({
  userID,
  type,
  setContent,
  address,
  setAddress,
  backButton,
  addressKey
}) => {

  const notAtHomes = collection(fdb, "notAtHomes");
  const [newMap, setNewMap] = useState(address.mapNumber);
  const [newSuburb, setNewSuburb] = useState(address.suburb);
  const [newStreet, setNewStreet] = useState(address.street);
  const [newHouseNumber, setNewHouseNumber] = useState(
    type == "Submit" ? "" : address.houseNumber
  );
  const [newUnitNumber, setNewUnitNumber] = useState(
    type == "Submit" ? "" : address.unitNumber
  );

  // const add = async () => {
  //   setContent("list");
  //   await addDoc(notAtHomes, {
  //     map: newMap,
  //     suburb: newSuburb,
  //     street: newStreet,
  //     houseNumber: newHouseNumber,
  //     unitNumber: newUnitNumber,
  //     userID: userID,
  //     createdAt: serverTimestamp(),
  //   });
  //   setNewHouseNumber("");
  //   setNewUnitNumber("");
  // };

  const add = async (id ) => {
    const address = doc(fdb, "notAtHomes", "MaitlandCongregation");
    const obj = {}
    const newAddress = {
      id: Date.now(),
      user: userID,
      mapNumber: newMap || 0,
      suburb: newSuburb,
      street: newStreet,
      houseNumber: Number(newHouseNumber),
      unitNumber: newUnitNumber || ""
    };
    obj["id" + Date.now()] = newAddress
    await updateDoc(address, obj);
    // setAddress(newFields);
    // setContent("list");
      setContent("list");

    setNewHouseNumber("");
    setNewUnitNumber("");
  };

  const update = async (id ) => {
      setContent("list");
    const address = doc(fdb, "notAtHomes", "MaitlandCongregation");

    const obj = {}
    const newAddress = {
      id: Date.now(),
      user: userID,
      mapNumber: newMap || 0,
      suburb: newSuburb,
      street: newStreet,
      houseNumber: Number(newHouseNumber),
      unitNumber: newUnitNumber || ""
    };
    
    obj[addressKey] = newAddress
    await updateDoc(address, obj);
    setAddress(newAddress);

    // setNewHouseNumber("");
    // setNewUnitNumber("");
  };

  const remove = async (id) => {
    const address = doc(fdb, "notAtHomes", "MaitlandCongregation");
    console.log(addressKey)
    const obj = {}
    obj[addressKey] = deleteField()
    await updateDoc(address, obj);
    setAddress({});
    setContent("list");
  };

  return (
    <>
      <div className="grid gap-2 p-4">
        <div className="flex gap-2">
          <div className="basis-1/3">
            <NumberInput
              action={(e) => {
                setNewMap(e.target.value);
              }}
              label="Map"
              value={newMap}
            ></NumberInput>
          </div>
          <TextInput
            action={(e) => {
              setNewSuburb(toTitleCase(e.target.value));
            }}
            label="Suburb"
            value={newSuburb}
          ></TextInput>
        </div>
        <div className="flex gap-2">
          <div className="basis-1/5">
            <TextInput
              action={(e) => {
                setNewUnitNumber(e.target.value);
              }}
              label="Unit"
              value={newUnitNumber}
            ></TextInput>
          </div>
          <div className="basis-1/4">
            <NumberInput
              action={(e) => {
                setNewHouseNumber(e.target.value);
              }}
              label="House"
              value={newHouseNumber}
            ></NumberInput>
          </div>
          <div>
            <TextInput
              action={(e) => {
                setNewStreet(toTitleCase(e.target.value));
              }}
              label="Street"
              value={newStreet}
            ></TextInput>
          </div>
        </div>
      </div>
      <div className="flex gap-4 px-6">
        {type == "Update" ? (
          <Button action={() => remove(address.id)}>Delete</Button>
        ) : null}

        {type == "Submit" ? (
          <Button action={() => setContent("list")}>Back</Button>
        ) : null}

        <Button
          action={() => {
            if (type == "Submit") {
              add();
            } else if (type == "Update") {
              update(address.id);
            }
            setAddress({
              mapNumber: newMap,
              suburb: newSuburb,
              street: newStreet,
              houseNumber: newHouseNumber,
              unitNumber: newUnitNumber,
            });
          }}
        >
          {type}
        </Button>
      </div>
    </>
  );
};
