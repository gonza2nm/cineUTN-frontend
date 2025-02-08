import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaEditComponent } from './cinema-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CinemaService } from '../cinemas/cinema.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('CinemaEditComponent', () => {
  let component: CinemaEditComponent;
  let fixture: ComponentFixture<CinemaEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [CinemaEditComponent],
      providers: [
        CinemaService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '123' } } 
          }
        }
      ]
    })
    fixture = TestBed.createComponent(CinemaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
