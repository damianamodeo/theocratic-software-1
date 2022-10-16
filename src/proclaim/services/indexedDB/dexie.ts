import Dexie, { Table } from 'dexie';

export interface Details {
  id?: number;
  userID: number;
  firstName: string;
  middleName: string;
  lastName: string;
  otherName: string;
}

export class MySubClassedDexie extends Dexie {
  details!: Table<Details>; 

  constructor() {
    super('DB');
    this.version(1).stores({
      details: '++id, firstName, middleName, lastName, otherName'
    });
  }
}

export const idb = new MySubClassedDexie();