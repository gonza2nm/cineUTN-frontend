import { TestBed } from '@angular/core/testing';

import { GenresService } from './genres.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GenresService', () => {
  let service: GenresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenresService]
    });
    service = TestBed.inject(GenresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
