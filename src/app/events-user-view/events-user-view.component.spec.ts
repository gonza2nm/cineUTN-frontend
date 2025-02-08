import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsUserViewComponent } from './events-user-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventService } from '../events/event.service';
import { CinemaService } from '../cinemas/cinema.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EventsUserViewComponent', () => {
  let component: EventsUserViewComponent;
  let fixture: ComponentFixture<EventsUserViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EventsUserViewComponent],
      providers: [EventService, CinemaService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(EventsUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
