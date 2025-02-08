import { TestBed } from '@angular/core/testing';

import { TheatersService } from './theaters.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TheatersService', () => {
  let service: TheatersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TheatersService]
    });
    service = TestBed.inject(TheatersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
