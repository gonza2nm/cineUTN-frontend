import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionslistComponent } from './promotionslist.component';

describe('PromotionslistComponent', () => {
  let component: PromotionslistComponent;
  let fixture: ComponentFixture<PromotionslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionslistComponent]
    });
    fixture = TestBed.createComponent(PromotionslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
