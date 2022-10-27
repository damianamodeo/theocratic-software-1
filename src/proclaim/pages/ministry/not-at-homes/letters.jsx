import { Button } from "../../../../common/components/inputs/button";
import { fdb } from "../../../../common/services/firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  orderBy,
  deleteField
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { TextInput } from "../../../../common/components/inputs/text";
import { NumberInput } from "../../../../common/components/inputs/number";
import { Card } from "../../../../common/components/containers/card";
import { DefaultText } from "../../../../common/components/text/text";
import { Content } from "../../../../common/components/containers/content";

export const Letters = ({ userID }) => {
  const notAtHomes = collection(fdb, "notAtHomes");
  const [editAddressID, setEditAddressID] = useState(undefined);
  const [addressKey, setAddressKey] = useState(undefined);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState([]);
  const [newMap, setNewMap] = useState("");
  const [newSuburb, setNewSuburb] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newHouseNumber, setNewHouseNumber] = useState("");
  const [newUnitNumber, setNewUnitNumber] = useState("");
  const [active, setActive] = useState("");
  const [screen, setScreen] = useState("visible");
  const [search, setSearch] = useState("");
  let total = 0;

  const addAddress = async () => {
    await addDoc(notAtHomes, {
      mapNumber: newMap,
      suburb: newSuburb,
      street: newStreet,
      houseNumber: Number(newHouseNumber),
      unitNumber: Number(newUnitNumber),
      userID: userID,
      createdAt: serverTimestamp(),
    });
    setNewHouseNumber("");
    setNewUnitNumber("");
  };

  const editAddress = (address, key) => {
    setAddressKey(key)
    setEditAddressID(address.id);
    setNewMap(address.map);
    setNewSuburb(address.suburb);
    setNewStreet(address.street);
    setNewHouseNumber(address.houseNumber);
    setNewUnitNumber(address.unitNumber);
    setScreen("hidden");
  };

  const foundHome = (id) => {};

  const foundNotHome = (id) => {};

  const updateAddress = async (id, sent) => {
    const address = doc(fdb, not-at-home, id);
    const newFields = {
      mapNumber: newMap,
      suburb: newSuburb,
      street: newStreet,
      houseNumber: newHouseNumber,
      unitNumber: newUnitNumber,
      createdAt: serverTimestamp(),
    };
    await updateDoc(address, { letterSent: sent });

    setScreen("visible");
  };

  const deleteAddress = async (id) => {
    const address = doc(fdb, not-at-home, id);
    await deleteDoc(address);

    setScreen("visible");
  };

  const remove = async (id) => {
    const address = doc(fdb, "notAtHomes", "MaitlandCongregation");
    console.log(addressKey)
    const obj = {}
    obj[addressKey] = deleteField()
    await updateDoc(address, obj);
    setAddress({});
    setScreen("visible");
  };

  useEffect(() => {
    const q = query(notAtHomes, where("cong", "==", "mmm"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAddresses(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
      );
      // console.log(addresses)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
        <div className={` ${screen}`}>
          <div className="mt-16 grid p-6 text-center font-noto text-sm text-blue-600 dark:text-blue-200">
            Tap on the address and select "LETTER
            SENT" to remove from the list. 
          </div>
          <div>
          {Object.keys(addresses)
              .sort()
              .map(function (key) {
                // console.log(key)
                const address = addresses[key];
                // console.log(addresses[key])
                if (key === "cong") return;
                if (key === "id") return;
                if (address.letter) {
                  total = total + 1;
                  return (
                    <div
                      className="my-4"
                      key={key}
                      onClick={() => {
                        editAddress(address, key);
                      }}
                    >
                      <Card>
                        <div>Map: {address.mapNumber}</div>
                        <div className="py-2 text-xl">
                          {`${
                            address.unitNumber ? `${address.unitNumber}/` : ""
                          }${address.houseNumber} ${address.street}, ${
                            address.suburb
                          }`}
                        </div>
                      </Card>
                      <div className="border"></div>
                    </div>
                  );}
              })}
            {/* {addresses.map((address) => {
              if (
                address.foundHome == "not home" &&
                address.letterSent == undefined
              ) {
                total = total + 1;
              }
              return address.foundHome == "not home" &&
                address.letterSent == undefined ? (
                <div
                  className="my-4"
                  key={address.id}
                  onClick={() => editAddress(address)}
                >
                  <Card>
                    <div>Map: {address.map}</div>
                    <div className="py-2 text-xl">
                      {`${address.unitNumber ? `${address.unitNumber}/` : ""}${
                        address.houseNumber
                      } ${address.street}, ${address.suburb}`}
                    </div>
                  </Card>
                    <div className="border"></div>
                </div>
              ) : null;
            })} */}
            <div className=" mt-10 text-bgDark">{total}</div>
          </div>
        </div>
        <div className={` my-8 ${screen == "visible" ? "hidden" : "visible"}`}>
          <Button action={() => remove(editAddressID)}>
            Letter Sent
          </Button>
        <div className={`my-24 ${screen == "visible" ? "hidden" : "visible"}`}>
          <Button action={() => setScreen("visible")}> {"Back"}</Button>
        </div>
        </div>
    </>
  );
};
