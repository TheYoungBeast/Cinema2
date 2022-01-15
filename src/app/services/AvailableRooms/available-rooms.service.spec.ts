import { TestBed } from '@angular/core/testing';

import { AvailableRoomsService } from './available-rooms.service';

describe('AvailableRoomsService', () => {
  let service: AvailableRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
