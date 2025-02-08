import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEditComponent } from './event-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../events/event.service';
import { CinemaService } from '../cinemas/cinema.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('EventEditComponent', () => {
  let component: EventEditComponent;
  let fixture: ComponentFixture<EventEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [EventEditComponent],
      providers: [
        EventService,
        CinemaService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '123' } 
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
    fixture = TestBed.createComponent(EventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
