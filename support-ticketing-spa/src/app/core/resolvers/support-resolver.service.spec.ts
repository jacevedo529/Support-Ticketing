import { TestBed } from '@angular/core/testing';

import { SupportResolverService } from './support-resolver.service';

describe('SupportResolverService', () => {
  let service: SupportResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
