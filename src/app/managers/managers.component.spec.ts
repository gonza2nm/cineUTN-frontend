import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersComponent } from './managers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from '../login/login.service';

describe('ManagersComponent', () => {
  let component: ManagersComponent;
  let fixture: ComponentFixture<ManagersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ManagersComponent],
      providers: [LoginService]
    });
    fixture = TestBed.createComponent(ManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
