import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyDetailsComponent } from './buy-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BuyService } from '../buy/buy.service';
import { AuthService } from '../auth/auth.service';
import { TicketService } from '../tickets/ticket.service';
import { ActivatedRoute } from '@angular/router';

describe('BuyDetailsComponent', () => {
  let component: BuyDetailsComponent;
  let fixture: ComponentFixture<BuyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BuyDetailsComponent], 
      providers: [
        BuyService,
        AuthService,
        TicketService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '123' }
            }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(BuyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
