import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsEditComponent } from './promotions-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PromotionsService } from '../promotions/promotions.service';
import { CinemaService } from '../cinemas/cinema.service';
import { ProductsService } from '../products/products.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('PromotionsEditComponent', () => {
  let component: PromotionsEditComponent;
  let fixture: ComponentFixture<PromotionsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [PromotionsEditComponent],
      providers: [
        PromotionsService,
        CinemaService,
        ProductsService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { code: 'PROMO123' } 
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    });
    fixture = TestBed.createComponent(PromotionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
