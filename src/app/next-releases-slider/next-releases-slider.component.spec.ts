import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextReleasesSliderComponent } from './next-releases-slider.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from '../movies/movie.service';

describe('NextReleasesSliderComponent', () => {
  let component: NextReleasesSliderComponent;
  let fixture: ComponentFixture<NextReleasesSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NextReleasesSliderComponent],
      providers: [
        MovieService,
      ]
    });
    fixture = TestBed.createComponent(NextReleasesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
