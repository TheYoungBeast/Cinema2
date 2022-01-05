import { TestBed } from '@angular/core/testing';

import { CinemaDataService } from './cinema-data.service';

describe('CinemaDataService', () => {
  let service: CinemaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinemaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
