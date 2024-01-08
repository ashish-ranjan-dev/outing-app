import { TestBed } from '@angular/core/testing';

import { OutingService } from './outing.service';

describe('OutingService', () => {
  let service: OutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
