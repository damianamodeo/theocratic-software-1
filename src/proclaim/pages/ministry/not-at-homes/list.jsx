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
  orderBy,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Card } from "../../../../common/components/containers/card";

export const List = ({ userID, update, setAddress }) => {
  const notAtHomes = collection(fdb, "notAtHomes");
  let total = 0;
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const q = query(notAtHomes, where("cong", "==", "mmm"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAddresses(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
      );


      // console.log(test)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div>
        {
          // console.log("sdfg", Object.keys(addresses))
        }
        {Object.keys(addresses)
          .sort(
          //   function (a, b) {
          //   return addresses[a].id - addresses[b].id;
          // }
          ).reverse()
          .map(function (key) {
            if (key === "cong" && key === "id") return;
            // console.log("sdfg", addresses)
            const address = addresses[key];
            // console.log("sdfg", addresses[key].user)
            if (address.letter) return

            if (address.user === userID) {
              return (
                <div
                  className="my-4"
                  key={key}
                  onClick={() => {
                    update(address, key);
                  }}
                >
                  <Card>
                    <div>Map: {address.mapNumber}</div>
                    <div className="py-2 text-xl">
                      {`${address.unitNumber ? `${address.unitNumber}/` : ""}${
                        address.houseNumber
                      } ${address.street}, ${address.suburb}`}
                    </div>
                  </Card>
                  <div className="border"></div>
                </div>
              );
            }
          })}

        {/* {addresses.map((address, key) => {
          if (
            address.userID == userID &&
            (address.foundHome == undefined) & (address.letterSent == undefined)
          ) {
            total = total + 1;
          }
          return address.userID !== userID ? (
            <div
              className="my-4"
              key={key}
              onClick={() => {
                update(address, key);
              }}
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

        {/* <div className="mb-24 grid text-center font-noto text-sm text-blue-600 dark:text-blue-200">
          Total Addresses: {total}
        </div> */}
      </div>
    </>
  );
};
