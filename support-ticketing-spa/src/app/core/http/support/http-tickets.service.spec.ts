import { TestBed } from '@angular/core/testing';

import { HttpTicketsService } from './http-tickets.service';

describe('HttpTicketsService', () => {
  let service: HttpTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
