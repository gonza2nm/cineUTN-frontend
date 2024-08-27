import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMoviesComponent } from './list-movies.component';

describe('ListMoviesComponent', () => {
  let component: ListMoviesComponent;
  let fixture: ComponentFixture<ListMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMoviesComponent]
    });
    fixture = TestBed.createComponent(ListMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
