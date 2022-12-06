import { PageContext } from "../../../../services/context/notAtHomesContext.tsx";
import { CallBackList } from "./callback/CallBackList";
import { CallBackForm } from "./callback/CallBackForm";
import { fdb } from "../../../../../../common/services/firebase/config.ts";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useContext, useState } from "react";
import { LettersList } from "./letters/LettersList.jsx";
import { LettersForm } from "./letters/LettersForm.jsx";
import { PersonalList } from "./personal/PersonalList";
import { PersonalUpdate } from "./personal/PersonalUpdate.jsx";
import { PersonalAdd } from "./personal/PersonalAdd.jsx";
import { MultipleEditForm } from "./form/MultipleEditForm";

export const NotAtHomes = ({ active }) => {
  const notAtHomes = collection(fdb, "notAtHomes");

  const { page, setPage } = useContext(PageContext);
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
    <>
      <div className={`${page === "PersonalList" ? "visible" : "hidden"}`}>
        <PersonalList addresses={addresses} />
      </div>
      <div className={`${page === "PersonalAdd" ? "visible" : "hidden"}`}>
        <PersonalAdd addresses={addresses} />
      </div>
      <div className={`${page === "PersonalUpdate" ? "visible" : "hidden"}`}>
        <PersonalUpdate addresses={addresses} />
      </div>
      <div className={`${page === "CallBackList" ? "visible" : "hidden"}`}>
        <CallBackList addresses={addresses} />
      </div>
      <div className={`${page === "CallBackForm" ? "visible" : "hidden"}`}>
        <CallBackForm addresses={addresses} />
      </div>
      <div className={`${page === "MultipleEdit" ? "visible" : "hidden"}`}>
        <MultipleEditForm addresses={addresses} />
      </div>
      <div className={`${page === "LettersList" ? "visible" : "hidden"}`}>
        <LettersList addresses={addresses} />
      </div>
      <div className={`${page === "LettersForm" ? "visible" : "hidden"}`}>
        <LettersForm addresses={addresses} />
      </div>
    </>
  );
};
