import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySnacksComponent } from './buy-snacks.component';

describe('BuySnacksComponent', () => {
  let component: BuySnacksComponent;
  let fixture: ComponentFixture<BuySnacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuySnacksComponent]
    });
    fixture = TestBed.createComponent(BuySnacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
