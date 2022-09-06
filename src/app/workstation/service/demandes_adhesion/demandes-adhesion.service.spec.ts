import { TestBed } from '@angular/core/testing';

import { DemandesAdhesionService } from './demandes-adhesion.service';

describe('DemandesAdhesionService', () => {
  let service: DemandesAdhesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandesAdhesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
