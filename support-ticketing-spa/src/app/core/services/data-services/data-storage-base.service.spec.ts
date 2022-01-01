import { TestBed } from '@angular/core/testing';

import { DataStorageBaseService } from './data-storage-base.service';

describe('DataStorageBaseService', () => {
  let service: DataStorageBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataStorageBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
