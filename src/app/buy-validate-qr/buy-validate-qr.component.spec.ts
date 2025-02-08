import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyValidateQrComponent } from './buy-validate-qr.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BuyService } from '../buy/buy.service';

describe('BuyValidateQrComponent', () => {
  let component: BuyValidateQrComponent;
  let fixture: ComponentFixture<BuyValidateQrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BuyValidateQrComponent],
      providers: [BuyService]
    }).compileComponents();
    fixture = TestBed.createComponent(BuyValidateQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
