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
  deleteField,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { TextInput } from "../../../../common/components/inputs/text";
import { NumberInput } from "../../../../common/components/inputs/number";
import { Card } from "../../../../common/components/containers/card";
import { DefaultText } from "../../../../common/components/text/text";
import { Content } from "../../../../common/components/containers/content";

export const Maps = () => {
  return (
    <div className="absolute w-full top-header-h bottom-navbar-h">
      <iframe
        className="w-full h-full"
        src="https://www.google.com/maps/d/u/2/embed?mid=19XzB5Q7UR5F5Whv2xra3myZmZVOJJWrU&ehbc=2E312F"
        // width="100%"
        // height="100%"
        // style="width:100%;height:100%;"
      ></iframe>
    </div>
  );
};
