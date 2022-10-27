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
  serverTimestamp,
  orderBy,
  where,
  deleteField
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Card } from "../../../../common/components/containers/card";
import { Content } from "../../../../common/components/containers/content";
import { Search } from "../../../../common/components/inputs/search";
import { Header } from "../../../../common/components/containers/header";

export const Callback = ({ userID, setContent}) => {
  const notAtHomes = collection(fdb, "notAtHomes");
  const [editAddressID, setEditAddressID] = useState("");
  const [addressKey, setAddressKey] = useState("");
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
      unitNumber: newUnitNumber,
      userID: userID,
      createdAt: serverTimestamp(),
    });
    setNewHouseNumber(0);
    setNewUnitNumber("");
  };

  const editAddress = (address, key) => {
    setAddressKey(key)
    setAddress(address);
    setEditAddressID(address.id);
    setNewMap(address.mapNumber);
    setNewSuburb(address.suburb);
    setNewStreet(address.street);
    setNewHouseNumber(address.houseNumber);
    setNewUnitNumber(address.unitNumber);
    setScreen("hidden");
  };

  const updateAddress = async (id, home) => {
    const address = doc(fdb, "notAtHomes", id);
    const newFields = {
      mapNumber: newMap,
      suburb: newSuburb,
      street: newStreet,
      houseNumber: newHouseNumber,
      unitNumber: newUnitNumber,
      createdAt: serverTimestamp(),
    };
    await updateDoc(address, { foundHome: home });

    setScreen("visible");
  };

  const deleteAddress = async (id) => {
    const address = doc(fdb, "not-at-home", id);
    await deleteDoc(address);

    setScreen("visible");
  };

  const remove = async (id) => {
    const address = doc(fdb, "notAtHomes", "MaitlandCongregation");
    const obj = {}
    obj[addressKey] = deleteField()
    await updateDoc(address, obj);
    setAddress({});
    setScreen("visible");
  };

  const update = async (id ) => {
    setScreen("visible");
  const address = doc(fdb, "notAtHomes", "MaitlandCongregation");

  const obj = {}
  const newAddress = {
    id: Date.now(),
    user: userID,
    mapNumber: newMap || "",
    suburb: newSuburb,
    street: newStreet,
    houseNumber: newHouseNumber,
    unitNumber: newUnitNumber || "",
    letter: true
  };
  // console.log(addressKey)
  
  obj[addressKey] = newAddress
  await updateDoc(address, obj);
  setAddress(newAddress);

  // setNewHouseNumber("");
  // setNewUnitNumber("");
};

  useEffect(() => {
    const q = query(notAtHomes, where("cong", "==", "mmm"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAddresses(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="overflow-hidden-xxx">
        <div
          className={`   w-screen ${
            screen == "visible" ? "visible" : "hidden"
          }`}
        >
          <Search
            action={(e) => {
              setSearch(new RegExp(e.target.value, "i"));
            }}
          ></Search>
        </div>
        <div className={` ${screen}`}>
          <div className="my-4 mx-16 grid-xxx pt-20-xxx text-center font-noto text-sm text-blue-600 dark:text-blue-200">
            After you have visited an address tap on it and select "HOME" or
            "NOT HOME"
          </div>
          <div>
            {Object.keys(addresses)
              .sort()
              .map(function (key) {
                const address = addresses[key];
                if (key === "cong") return;
                if (key === "id") return;
                if (address.letter) return 
                const str = `${address.mapNumber} ${address.suburb} ${address.street}`;
                if (str.match(search)) {

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
          </div>

          {/* <div className="overflow-hidden-xxx">
            {Object.keys(addresses)
              .filter((address) => {
                let str = `${address.map} ${address.suburb} ${address.street}`;
                return str.match(search);
              })
              .map((addresses, key) => {
                if (
                  (address.foundHome == undefined) &
                  (address.letterSent == undefined)
                ) {
                  total = total + 1;
                }
                return address.foundHome == undefined &&
                  address.letterSent == undefined ? (
                  <div
                    className="my-4-xxx"
                    key={address.id}
                    onClick={() => editAddress(address)}
                  >
                    <Card>
                      <div>Map: {address.map}</div>
                      <div className="py-2-xxx text-xl">
                        {`${
                          address.unitNumber ? `${address.unitNumber}/` : ""
                        }${address.houseNumber} ${address.street}, ${
                          address.suburb
                        }`}
                      </div>
                    </Card>
                    <div className="border"></div>
                  </div>
                ) : null;
              })}
            </div> */}
            <div className=" my-10-xxx text-bgDark">{total}</div>
        </div>
        <div className={` mt-40 ${screen == "visible" ? "hidden" : "visible"}`}>
          <Button action={() => remove(editAddressID)}>
            Home
          </Button>
        </div>
        <div className={` my-12 ${screen == "visible" ? "hidden" : "visible"}`}>
          <Button action={() => update(editAddressID)}>
            Not Home
          </Button>
        </div>

        <div className={`my-24 ${screen == "visible" ? "hidden" : "visible"}`}>
          <Button action={() => setScreen("visible")}> {"Back"}</Button>
        </div>
        {/* <div className={` my-12 ${screen == "visible" ? "hidden" : "visible"}`}>
          <Button
            action={() =>
              window.open(
                `external:https://www.google.com/maps/place/${address.houseNumber}+${address.street}+${address.suburb}`
              )
            }
          >
            Map
          </Button>
        </div> */}
      </div>
    </>
  );
};
