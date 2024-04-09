// video.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  apiLoaded = false;
  private baseUrl = 'http://localhost:8080/online-learning-platform/auth/video';

  constructor(private http: HttpClient) {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  getVideoLink(videoId: number): Observable<any> {
    const url = `${this.baseUrl}/${videoId}`;
    return this.http.get<any>(url);
  }
  createVideo(video: Video, file: File): Observable<Video> {
    const formData: FormData = new FormData();
    formData.append('video', JSON.stringify(video));
    formData.append('file', file);

    return this.http.post<Video>(`http://localhost:8080/online-learning-platform/auth/video-file`, formData);
  }
}
