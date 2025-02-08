import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionslistComponent } from './promotionslist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PromotionsService } from '../promotions/promotions.service';

describe('PromotionslistComponent', () => {
  let component: PromotionslistComponent;
  let fixture: ComponentFixture<PromotionslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PromotionslistComponent],
      providers: [PromotionsService]
    });
    fixture = TestBed.createComponent(PromotionslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
