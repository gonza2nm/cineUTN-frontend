import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemasComponent } from './cinemas.component';

describe('CinemasComponent', () => {
  let component: CinemasComponent;
  let fixture: ComponentFixture<CinemasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CinemasComponent]
    });
    fixture = TestBed.createComponent(CinemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
