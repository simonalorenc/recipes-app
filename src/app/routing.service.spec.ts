import { TestBed } from '@angular/core/testing';

import { RoutingService } from './routing.service';

describe('RoutingServiceService', () => {
  let service: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
