import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LandingpageService } from './landingpage.service';

describe('LandingpageService', () => {
  let service: LandingpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [LandingpageService] // Provide LandingpageService
    });
    service = TestBed.inject(LandingpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
