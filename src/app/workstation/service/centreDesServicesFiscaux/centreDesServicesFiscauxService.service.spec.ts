import { TestBed } from '@angular/core/testing';

import { CentreDesServicesFiscauxService } from './centreDesServicesFiscauxService.service';

describe('CentreDesServicesFiscauxService', () => {
  let service: CentreDesServicesFiscauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentreDesServicesFiscauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
