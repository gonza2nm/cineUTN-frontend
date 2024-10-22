import { TestBed } from '@angular/core/testing';

import { ShowtimesByCinemaService } from './showtimes-by-cinema.service';

describe('ShowtimesByCinemaService', () => {
  let service: ShowtimesByCinemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowtimesByCinemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
