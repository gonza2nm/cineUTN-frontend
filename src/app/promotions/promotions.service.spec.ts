import { TestBed } from '@angular/core/testing';

import { PromotionsService } from './promotions.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PromotionsService', () => {
  let service: PromotionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [PromotionsService]
    });
    service = TestBed.inject(PromotionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
