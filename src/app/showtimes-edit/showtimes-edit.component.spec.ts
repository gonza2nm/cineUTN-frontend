import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimesEditComponent } from './showtimes-edit.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShowtimesByCinemaService } from '../showtimes-by-cinema/showtimes-by-cinema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
;


describe('ShowtimesEditComponent', () => {
  let component: ShowtimesEditComponent;
  let fixture: ComponentFixture<ShowtimesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [ShowtimesEditComponent],
      providers: [
        ShowtimesByCinemaService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '123' } }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    })
    
    fixture = TestBed.createComponent(ShowtimesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
