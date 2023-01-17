import { TestBed } from '@angular/core/testing';

import { MyWebSocketServiceService } from './my-web-socket-service.service';

describe('MyWebSocketServiceService', () => {
  let service: MyWebSocketServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyWebSocketServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
