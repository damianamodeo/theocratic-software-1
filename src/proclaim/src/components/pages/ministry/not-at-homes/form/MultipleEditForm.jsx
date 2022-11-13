import { updateDoc, doc } from "firebase/firestore";
import { useContext, useState } from "react";
import { Button } from "../../../../../../../common/components/inputs/button";
import { TextInput } from "../../../../../../../common/components/inputs/text";
import { fdb } from "../../../../../../../common/services/firebase/config";
import { toTitleCase } from "../../../../../../../common/services/formatting/titleCase";
import { HeaderContext } from "../../../../../services/context/mainContext";
import {
  PageContext,
  MultipleEditContext,
} from "../../../../../services/context/notAtHomesContext";

export const MultipleEditForm = ({ addresses }) => {
  const { multipleEdit, setMultipleEdit } = useContext(MultipleEditContext);
  const { header, setHeader } = useContext(HeaderContext);
  const { page, setPage } = useContext(PageContext);

  const update = async () => {
    setPage("CallBackList");
    setHeader("Personal");
    const document = doc(fdb, "notAtHomes", "MaitlandCongregation");
    const obj = {};
    [
      ...new Set(
        Object.keys(
          Object.fromEntries(
            Object.entries(addresses).filter(([key, address]) =>
              multipleEdit.key === "suburb"
                ? address[multipleEdit.key] === multipleEdit.oldSuburb
                : address[multipleEdit.key] === multipleEdit.oldStreet
            )
          )
        ).map((id) => id)
      ),
    ].map((id) => {
      obj[id] = {
        ...addresses[id],
        suburb: multipleEdit.newSuburb,
        ...(multipleEdit.key === "street" && {
          street: multipleEdit.newStreet,
        }),
      };
    });
    await updateDoc(document, obj);
  };

  return (
    <div>
      <div className="p-2">
        <TextInput
          action={(e) => {
            setMultipleEdit({
              ...multipleEdit,
              newSuburb: toTitleCase(e.target.value),
            });
          }}
          label={"Suburb"}
          value={multipleEdit.newSuburb}
        ></TextInput>
      </div>
      {multipleEdit.key === "street" ? (
        <div className="p-2">
          <TextInput
            action={(e) => {
              setMultipleEdit({
                ...multipleEdit,
                newStreet: toTitleCase(e.target.value),
              });
            }}
            label={multipleEdit.key}
            value={multipleEdit.newStreet}
          ></TextInput>
        </div>
      ) : null}

      <div className="flex gap-2 w-screen p-2">
        <Button
          action={() => {
            setHeader("Call Back List");
            setPage("CallBackList");
          }}
        >
          Back
        </Button>
        <Button action={() => update()}>Update</Button>
      </div>
    </div>
  );
};
