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
  deleteField,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Card } from "../../../../common/components/containers/card";
import { Content } from "../../../../common/components/containers/content";
import { Search } from "../../../../common/components/inputs/search";
import { Header } from "../../../../common/components/containers/header";

export const Callback = ({ userID, setContent }) => {
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
  let oldSuburb = "";
  let writeSuburb = true;
  let oldStreet = "";
  let writeStreet = true;

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
    setAddressKey(key);
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
    const obj = {};
    obj[addressKey] = deleteField();
    await updateDoc(address, obj);
    setAddress({});
    setScreen("visible");
  };

  const update = async (id) => {
    setScreen("visible");
    const address = doc(fdb, "notAtHomes", "MaitlandCongregation");

    const obj = {};
    const newAddress = {
      id: Date.now(),
      user: userID,
      mapNumber: newMap || "",
      suburb: newSuburb,
      street: newStreet,
      houseNumber: newHouseNumber,
      unitNumber: newUnitNumber || "",
      letter: true,
    };

    obj[addressKey] = newAddress;
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
          {/* <Search
            action={(e) => {
              setSearch(new RegExp(e.target.value, "i"));
            }}
          ></Search> */}
        </div>
        <div className={` ${screen}`}>
          <div className="my-4 mx-16 grid-xxx pt-20-xxx text-center font-noto text-sm text-blue-600 dark:text-blue-200">
            After you have visited an address tap on it and select "HOME" or
            "NOT HOME"
          </div>
          <div className="">
            {[
              ...new Set(
                Object.keys(
                  Object.fromEntries(
                    Object.entries(addresses).filter(
                      ([key, value]) => !value.letter
                    )
                  )
                ) //.filter(address => address.letter === true)
                  .sort(function (a, b) {
                    return addresses[a].suburb > addresses[b].suburb ? 1 : -1;
                  })
                  .filter((id) => true)
                  .map((key) => addresses[key].suburb)
              ),
            ].map(function (suburb) {
              if (!suburb) return;
              return (
                <>
                  <div
                    key={suburb}
                    className="text-primary font-bold text-3xl pb-4 text-center"
                  >
                    {suburb}
                    <div>
                      {[
                        ...new Set(
                          Object.keys(
                            Object.fromEntries(
                              Object.entries(addresses).filter(
                                ([key, value]) => !value.letter
                              )
                            )
                          )
                            .sort(function (a, b) {
                              return addresses[a].street > addresses[b].street
                                ? 1
                                : -1;
                            })
                            .filter((id) => addresses[id].suburb === suburb)
                            // .filter((id) => addresses[id].letter === true)
                            .map((id) => addresses[id].street)
                        ),
                      ].map(function (street) {
                        return (
                          <>
                            <div
                              key={street}
                              className="text-black font-normal px-2 py-4 text-2xl text-left"
                            >
                              {street}
                              <div className="pt-4 text-2xl text-left grid grid-cols-4 gap-2">
                                {Object.keys(addresses)
                                  .filter((id) => {
                                    const address = addresses[id];
                                    if (id === "cong") {
                                      return false;
                                    }
                                    if (id === "id") {
                                      return false;
                                    }
                                    if (suburb !== address.suburb) {
                                      return false;
                                    }
                                    if (street !== address.street) {
                                      return false;
                                    }
                                    if (address.letter) {
                                      return false;
                                    }
                                    return true;
                                  })
                                  .sort(function (a, b) {
                                    if (
                                      addresses[a].houseNumber !==
                                      addresses[b].houseNumber
                                    ) {
                                      return addresses[a].houseNumber >
                                        addresses[b].houseNumber
                                        ? 1
                                        : -1;
                                    }
                                    return parseInt(addresses[b].unitNumber) <
                                      parseInt(addresses[a].unitNumber)
                                      ? 1
                                      : -1;
                                  })
                                  .map(function (id) {
                                    const address = addresses[id];
                                    return (
                                      <>
                                        <div
                                          key={id}
                                          className="py-4 text-lg align-middle text-center bg-bg "
                                          onClick={() => {
                                            editAddress(addresses[id], id);
                                          }}
                                        >
                                          {address.unitNumber
                                            ? `${address.unitNumber}-`
                                            : ""}
                                          {address.houseNumber}
                                        </div>
                                      </>
                                    );
                                  })}
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })}
            {
              // console.log( Object.fromEntries(Object.entries(addresses).filter(([key, value]) => !value.letter)))
            }
            {
              // console.log( addresses)
            }
          </div>
          <div className=" my-10-xxx text-bgDark">{total}</div>
        </div>
        <div
          className={` my-20 text-center ${
            screen == "visible" ? "hidden" : "visible"
          }`}
        >
          <div className=" text-2xl ">
            {`${address.unitNumber ? `${address.unitNumber}/` : ""}${
              address.houseNumber
            } ${address.street}, ${address.suburb} 
                            `}
          </div>

          {/* <div className="border"></div> */}
        </div>
        <div className={` mt-4 ${screen == "visible" ? "hidden" : "visible"}`}>
          <Button action={() => remove(editAddressID)}>Home</Button>
        </div>
        <div className={` my-12 ${screen == "visible" ? "hidden" : "visible"}`}>
          <Button action={() => update(editAddressID)}>Not Home</Button>
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
