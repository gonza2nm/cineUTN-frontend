import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsComponent } from './promotions.component';

describe('PromotionsComponent', () => {
  let component: PromotionsComponent;
  let fixture: ComponentFixture<PromotionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionsComponent]
    });
    fixture = TestBed.createComponent(PromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
