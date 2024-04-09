import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService]
    });
    service = TestBed.inject(PaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create enrollment', () => {
    const studentId = 1;
    const courseId = 2;
    const courseData = { studentId, courseId };

    service.createEnrollment(courseData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:8080/online-learning-platform/auth/enrollment/${studentId}/course?courseId=${courseId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(courseData);
    req.flush({ /* Mock response object */ });
  });

  // Add more tests for other methods if needed
});
