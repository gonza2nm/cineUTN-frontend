import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimesEditComponent } from './showtimes-edit.component';

describe('ShowtimesEditComponent', () => {
  let component: ShowtimesEditComponent;
  let fixture: ComponentFixture<ShowtimesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowtimesEditComponent]
    });
    fixture = TestBed.createComponent(ShowtimesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
