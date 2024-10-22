import { TestBed } from '@angular/core/testing';

import { TheaterByCinemaService } from './theater-by-cinema.service'; 

describe('TheaterByCinemaServiceService', () => {
  let service: TheaterByCinemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheaterByCinemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
