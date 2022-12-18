import { fdb } from "@FIREBASE/config";
import { Button } from "@INPUTS/Button";
import { doc, setDoc } from "firebase/firestore";

const createNewCollection = async () => {
  const collection = "newCollection";
  const document = "documentID";
  const data = { name: "Damian", age: 46 };
  const docRef = doc(fdb, collection, document);
  const id = await setDoc(docRef, data);
  console.log(docRef.id);
};

export const CreateNewCollection = () => {
  return (
    <>
      <Button
        action={() => {
          createNewCollection();
        }}
      >
        Create New Collection
      </Button>
    </>
  );
};
