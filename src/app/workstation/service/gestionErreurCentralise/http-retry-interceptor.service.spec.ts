import { TestBed } from '@angular/core/testing';

import { HttpRetryInterceptorService } from './http-retry-interceptor.service';

describe('HttpRetryInterceptorService', () => {
  let service: HttpRetryInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRetryInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
