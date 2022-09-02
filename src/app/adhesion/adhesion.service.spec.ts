import { TestBed } from '@angular/core/testing';

import { AdhesionService } from './adhesion.service';

describe('AdhesionService', () => {
  let service: AdhesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdhesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
