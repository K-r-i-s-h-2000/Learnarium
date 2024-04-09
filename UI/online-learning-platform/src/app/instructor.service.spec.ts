import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InstructorService } from './instructor.service';
import { Video } from './course.model';

describe('InstructorService', () => {
  let service: InstructorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InstructorService]
    });
    service = TestBed.inject(InstructorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get course by instructor id', () => {
    const instructorId = 1;
    const dummyCourses = [{ id: 1, name: 'Course 1' }, { id: 2, name: 'Course 2' }];

    service.getCourseByInstructorId(instructorId).subscribe(courses => {
      expect(courses).toEqual(dummyCourses);
    });

    const req = httpMock.expectOne(`http://localhost:8080/online-learning-platform/auth/course/instructor/${instructorId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourses);
  });

  it('should submit course form', () => {
    const dummyFormValue = { /* Your dummy form value here */ };

    service.submitCourseForm(dummyFormValue).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:8080/online-learning-platform/auth/course`);
    expect(req.request.method).toBe('POST');
    req.flush({ /* Mock response object */ });
  });

  it('should create video', () => {
    const dummyVideo: Video = {
      title: '',
      link: ''
    };

    service.createVideo(dummyVideo).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:8080/online-learning-platform/auth/video`);
    expect(req.request.method).toBe('POST');
    req.flush({ /* Mock response object */ });
  });

  // Add more tests for other methods if needed
});
