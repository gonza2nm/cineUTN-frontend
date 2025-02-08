import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresEditComponent } from './genres-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { GenresService } from '../genres/genres.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('GenresEditComponent', () => {
  let component: GenresEditComponent;
  let fixture: ComponentFixture<GenresEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [GenresEditComponent],
      providers: [
        GenresService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '123' }
            }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(GenresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
