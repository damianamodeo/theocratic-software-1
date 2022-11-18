import Dexie from "dexie";

export const idb = new Dexie("Orderly");
idb.version(1).stores({
  settings: `++id, firstName, lastName`,
  publishers: "++id, firstName, lastName, [lastName+firstName]",
});
