import { TestBed } from '@angular/core/testing';

import { PmeserviceService } from './pmeservice.service';

describe('PmeserviceService', () => {
  let service: PmeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PmeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
