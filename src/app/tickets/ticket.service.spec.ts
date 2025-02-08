import { TestBed } from '@angular/core/testing';

import { TicketService } from './ticket.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketService]
    });
    service = TestBed.inject(TicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
