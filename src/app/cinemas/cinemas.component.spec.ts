import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemasComponent } from './cinemas.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CinemaService } from './cinema.service';

describe('CinemasComponent', () => {
  let component: CinemasComponent;
  let fixture: ComponentFixture<CinemasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CinemasComponent],
      providers: [CinemaService]
    });
    fixture = TestBed.createComponent(CinemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
