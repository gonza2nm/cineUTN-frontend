import { TestBed } from '@angular/core/testing';

import { BuyService } from './buy.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('BuyService', () => {
  let service: BuyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuyService]
    });
    service = TestBed.inject(BuyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
