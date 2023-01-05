import { TestBed } from '@angular/core/testing';

import { MinistereDepensierService } from './ministereDepensierService.service';

describe('MinistereDepensierService', () => {
  let service: MinistereDepensierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinistereDepensierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
