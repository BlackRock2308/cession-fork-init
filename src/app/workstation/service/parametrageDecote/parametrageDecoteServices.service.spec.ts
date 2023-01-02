import { TestBed } from '@angular/core/testing';

import { ParametrageDecoteServices } from './parametrageDecoteServices.service';

describe('ParametrageDecoteServices', () => {
  let service: ParametrageDecoteServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametrageDecoteServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
