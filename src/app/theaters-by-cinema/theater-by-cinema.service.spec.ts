import { TestBed } from '@angular/core/testing';

import { TheaterByCinemaService } from './theater-by-cinema.service'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TheaterByCinemaServiceService', () => {
  let service: TheaterByCinemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [TheaterByCinemaService]
    });
    service = TestBed.inject(TheaterByCinemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
