import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatersByCinemaComponent } from './theaters-by-cinema.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TheaterByCinemaService } from './theater-by-cinema.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('TheatersByCinemaComponent', () => {
  let component: TheatersByCinemaComponent;
  let fixture: ComponentFixture<TheatersByCinemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TheatersByCinemaComponent],
      providers: [
        TheaterByCinemaService,
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
    });
    fixture = TestBed.createComponent(TheatersByCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
