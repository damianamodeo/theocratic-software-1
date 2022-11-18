import { idb } from "../../../orderly/src/services/indexedDB/dexie";
import { Button } from "../../components/inputs/button";

export const TestFunction = () => {
  const test = async () => {
    const db = await idb.settings.get(1);
    if (db == undefined) {
      idb.settings.add({ id: 1, firstName: "Damian" });
      return await idb.settings.get(1);
    } else {
      return db;
    }
  };

  return (
    <div className="p-4">
      <Button action={test}>Test</Button>
    </div>
  );
};
