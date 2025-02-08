import { TestBed } from '@angular/core/testing';

import { MovieDetailsService } from './movie-details.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MovieDetailsService', () => {
  let service: MovieDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieDetailsService]
    });
    service = TestBed.inject(MovieDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
