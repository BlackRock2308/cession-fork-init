import { TestBed } from '@angular/core/testing';

import { BonEngagementService } from './bon-engagement.service';

describe('BonEngagementService', () => {
  let service: BonEngagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonEngagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
