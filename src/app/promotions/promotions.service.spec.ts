import { TestBed } from '@angular/core/testing';

import { PromotionsService } from './promotions.service';

describe('PromotionsService', () => {
  let service: PromotionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
