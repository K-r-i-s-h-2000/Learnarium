import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { VideoService } from './video.service';
import { Video } from './course.model';

describe('VideoService', () => {
  let service: VideoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [VideoService]
    });
    service = TestBed.inject(VideoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no outstanding HTTP requests are pending
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch video link by id', () => {
    const dummyVideoId = 1;
    const dummyVideoData = { /* Provide dummy video data */ };

    service.getVideoLink(dummyVideoId).subscribe(videoLink => {
      expect(videoLink).toEqual(dummyVideoData);
    });

    const req = httpMock.expectOne(`http://localhost:8080/online-learning-platform/auth/video/${dummyVideoId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyVideoData);
  });

  it('should create video', () => {
    const dummyVideo: Video = {
      title: '',
      link: ''
    };
    const dummyFile = new File([], 'dummy_video.mp4');

    service.createVideo(dummyVideo, dummyFile).subscribe(createdVideo => {
      expect(createdVideo).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/online-learning-platform/auth/video-file');
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTruthy();
    req.flush(dummyVideo); // Flush the response with dummy video data
  });
});
