import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyComponent } from './buy.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieDetailsService } from '../movie-details/movie-details.service';
import { ActivatedRoute } from '@angular/router';

describe('BuyComponent', () => {
  let component: BuyComponent;
  let fixture: ComponentFixture<BuyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BuyComponent],
      providers: [
        MovieDetailsService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '123' } }
          }
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(BuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format the date and hour correctly', () => {
    
    const date = new Date('2025-02-06T20:30:00Z'); // Fecha y hora en formato ISO

    const formattedDate = component.formatDateAndHour(date);

    // Verificamos que el formato sea el esperado
    expect(formattedDate).toBe('06/02/2025 - 17:30 hs');
  });


  it('should handle single-digit day and month correctly', () => {
    
    const date = new Date('2025-02-06T09:05:00Z'); // Fecha con día y mes de un solo dígito

    const formattedDate = component.formatDateAndHour(date);

    // Verificamos el formato cuando el día y mes son de un solo dígito
    expect(formattedDate).toBe('06/02/2025 - 06:05 hs');
  });


  it('should format 12:00 AM and 12:00 PM correctly', () => {
    
    const date1 = new Date('2025-02-06T00:00:00Z'); // Medianoche (00:00)

    const formattedDate1 = component.formatDateAndHour(date1);
    expect(formattedDate1).toBe('05/02/2025 - 21:00 hs');


    const date2 = new Date('2025-02-06T12:00:00Z');     // Mediodía (12:00)

    const formattedDate2 = component.formatDateAndHour(date2);
    expect(formattedDate2).toBe('06/02/2025 - 09:00 hs');
  });


  it('should handle dates with a future year correctly', () => {
  const date = new Date('2026-03-15T14:30:00Z'); // Fecha en el futuro
  const formattedDate = component.formatDateAndHour(date);
  expect(formattedDate).toBe('15/03/2026 - 11:30 hs');
});
});
