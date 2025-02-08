import { TestBed } from '@angular/core/testing';

import { MyAccountService } from './my-account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MyAccountService', () => {
  let service: MyAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [MyAccountService]
    });
    service = TestBed.inject(MyAccountService);
  });

  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
})
