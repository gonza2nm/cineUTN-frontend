import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatersComponent } from './theaters.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TheatersService } from './theaters.service';

describe('TheatersComponent', () => {
  let component: TheatersComponent;
  let fixture: ComponentFixture<TheatersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TheatersComponent],
      providers: [TheatersService]
    });
    fixture = TestBed.createComponent(TheatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
