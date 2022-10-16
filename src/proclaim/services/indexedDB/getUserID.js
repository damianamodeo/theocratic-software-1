export  const getUserID = async () => {
  const item = await idb.settings.get(1);
  if (item == undefined) {
    idb.settings.add({ id: 1, userID: Date.now() });
    return await idb.settings.get(1);
  } else {
    return item;
  }
};