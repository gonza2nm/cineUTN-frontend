import { TestBed } from '@angular/core/testing';

import { ShowtimesByCinemaService } from './showtimes-by-cinema.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShowtimesByCinemaService', () => {
  let service: ShowtimesByCinemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShowtimesByCinemaService]
    });
    service = TestBed.inject(ShowtimesByCinemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
