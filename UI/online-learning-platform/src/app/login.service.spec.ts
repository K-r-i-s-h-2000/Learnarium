import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should submit login form', () => {
    const formValue = { /* your form value object */ };
    const mockResponse = { /* your mock response object */ };

    service.submitLoginForm(formValue).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/online-learning-platform/auth/authenticate');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should change password', () => {
    const formValue = { /* your form value object */ };
    const mockResponse = { /* your mock response object */ };

    service.changePassword(formValue).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/online-learning-platform/users');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // Add more test cases for other methods as needed
});
