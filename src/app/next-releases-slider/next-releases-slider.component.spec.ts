import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextReleasesSliderComponent } from './next-releases-slider.component';

describe('NextReleasesSliderComponent', () => {
  let component: NextReleasesSliderComponent;
  let fixture: ComponentFixture<NextReleasesSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NextReleasesSliderComponent]
    });
    fixture = TestBed.createComponent(NextReleasesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
