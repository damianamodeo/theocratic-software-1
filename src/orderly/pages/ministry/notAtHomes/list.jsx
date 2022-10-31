import { fdb } from "../../../../common/services/firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Suburbs } from "./suburbs";

export const List = ({ userID, update, setAddress }) => {
  const notAtHomes = collection(fdb, "notAtHomes");
  const [addresses, setAddresses] = useState([]);

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
    <Suburbs addresses={addresses}>
      
    </Suburbs>
  );
};
