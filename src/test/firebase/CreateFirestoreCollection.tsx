import { fdb } from "@FIREBASE/config";
// import { Test } from "@firebase/Test";
// import { Button } from "@inputs/Button";
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
// import { useEffect, useState } from "react";

export const CreateFirestoreCollection = async () => {
  const docRef = doc(fdb, "aaa", "bbb");

  const document = await setDoc(docRef, {
    name: "damian",
    age: 46,
  });

  console.log("hello", document);
};

export const createNewCollection = async () => {
  const collection= "newCollection"
  const document = "documentID"
  const data = {name: "Damian", age: 46}
  const docRef = doc(fdb, collection, document);
  const id = await setDoc(docRef, data);
  console.log(docRef.id)
};
