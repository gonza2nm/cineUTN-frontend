import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsUserViewComponent } from './events-user-view.component';

describe('EventsUserViewComponent', () => {
  let component: EventsUserViewComponent;
  let fixture: ComponentFixture<EventsUserViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsUserViewComponent]
    });
    fixture = TestBed.createComponent(EventsUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
