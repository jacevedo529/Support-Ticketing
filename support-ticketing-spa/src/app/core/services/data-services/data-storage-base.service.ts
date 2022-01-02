import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// Ref: https://medium.com/swlh/custom-sessionstorage-for-angular-security-2c8fd265494d
export class DataStorageBaseService {
  private dataStorageModel: any = {};
  constructor() { }

  protected baseSet(key: string, dataToStore: any) {
    this.dataStorageModel[key] = dataToStore;
  }
  protected baseGet(key: string): any | undefined {
    return this.dataStorageModel[key];
  }
  protected baseRemove(key: string) {
    this.dataStorageModel[key] = null;
  }
  protected baseClearAll() {
    this.dataStorageModel = {};
  }
}
