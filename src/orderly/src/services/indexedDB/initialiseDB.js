import {idb} from "./dexie"

const initialiseDB = async () => {
  const db = await idb.settings.get(1);
  if (db == undefined) {
    idb.settings.add({ id: 1, userID: Date.now() });
    return await idb.settings.get(1);
  } else {
    return db;
  }
};