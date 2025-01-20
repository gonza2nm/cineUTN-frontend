import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyValidateQrComponent } from './buy-validate-qr.component';

describe('BuyValidateQrComponent', () => {
  let component: BuyValidateQrComponent;
  let fixture: ComponentFixture<BuyValidateQrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyValidateQrComponent]
    });
    fixture = TestBed.createComponent(BuyValidateQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
