import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatersByCinemaComponent } from './theaters-by-cinema.component';

describe('TheatersByCinemaComponent', () => {
  let component: TheatersByCinemaComponent;
  let fixture: ComponentFixture<TheatersByCinemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheatersByCinemaComponent]
    });
    fixture = TestBed.createComponent(TheatersByCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
