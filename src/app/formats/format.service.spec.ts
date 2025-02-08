import { TestBed } from '@angular/core/testing';

import { FormatService } from './format.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormatService', () => {
  let service: FormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [FormatService]
    });
    service = TestBed.inject(FormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
