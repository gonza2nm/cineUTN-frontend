import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimesByCinemaComponent } from './showtimes-by-cinema.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShowtimesByCinemaService } from './showtimes-by-cinema.service';
import { ActivatedRoute } from '@angular/router';

describe('ShowtimesByCinemaComponent', () => {
  let component: ShowtimesByCinemaComponent;
  let fixture: ComponentFixture<ShowtimesByCinemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ShowtimesByCinemaComponent],
      providers: [
        ShowtimesByCinemaService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '123' }
            }
          }
        },
      ]
    });
    fixture = TestBed.createComponent(ShowtimesByCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
