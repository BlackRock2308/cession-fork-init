import { TestBed } from '@angular/core/testing';
import { DemandesCessionService } from './demandes-cession.service';

describe('DemandesCessionService', () => {
  let service: DemandesCessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandesCessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
