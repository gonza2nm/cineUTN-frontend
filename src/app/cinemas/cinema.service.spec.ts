import { TestBed } from '@angular/core/testing';

import { CinemaService } from './cinema.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CinemaService', () => {
  let service: CinemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule aquí
      providers: [CinemaService]
    });
    service = TestBed.inject(CinemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
