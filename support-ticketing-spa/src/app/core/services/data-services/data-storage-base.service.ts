import { Injectable } from '@angular/core';
import { DataStorageModel } from '../../models/dataStorage.model';

@Injectable({
  providedIn: 'root'
})
// Ref: https://medium.com/swlh/custom-sessionstorage-for-angular-security-2c8fd265494d
export class DataStorageBaseService {
  private dataStorageModel: DataStorageModel = new DataStorageModel();
  constructor() { }

  protected baseSet(key: string, dataToStore: any) {
    Object.keys(this.dataStorageModel).push(dataToStore);
    //this.dataStorageModel[key] = dataToStore;
  }
  protected baseGet(key: string): any | undefined {
    return Object.keys(this.dataStorageModel).find(x => x === key);
    //return this.dataStorageModel[key];
  }
  protected baseRemove(key: string) {
    const keyIndex = Object.keys(this.dataStorageModel).findIndex(x => x === key);
    Object.keys(this.dataStorageModel).splice(keyIndex);
    //this.dataStorageModel[key] = null;
  }
  protected baseClearAll() {
    this.dataStorageModel = new DataStorageModel();
  }
}
