import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsComponent } from './promotions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PromotionsService } from './promotions.service';
import { CinemaService } from '../cinemas/cinema.service';
import { FormsModule } from '@angular/forms';

describe('PromotionsComponent', () => {
  let component: PromotionsComponent;
  let fixture: ComponentFixture<PromotionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [PromotionsComponent],
      providers: [
        PromotionsService,
        CinemaService
      ]
    });
    fixture = TestBed.createComponent(PromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
