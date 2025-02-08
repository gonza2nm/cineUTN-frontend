import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterEditComponent } from './theater-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { TheaterByCinemaService } from '../theaters-by-cinema/theater-by-cinema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('TheaterEditComponent', () => {
  let component: TheaterEditComponent;
  let fixture: ComponentFixture<TheaterEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [TheaterEditComponent],
      providers: [
        TheaterByCinemaService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '123' } } // Proporciona un snapshot con params
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate') // Simula el Router
          }
        }
      ]
    });
    fixture = TestBed.createComponent(TheaterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
