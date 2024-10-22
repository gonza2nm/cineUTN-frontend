import { TestBed } from '@angular/core/testing';

import { TheatersService } from './theaters.service.js';

describe('TheatersService', () => {
  let service: TheatersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheatersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
