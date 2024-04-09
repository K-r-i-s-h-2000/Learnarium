import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrl = 'http://localhost:8080/online-learning-platform/auth';
  
  constructor(private http:HttpClient) { }

  getCourseByInstructorId(instructorId:number,token?:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/course/instructor/${instructorId}`);
  }
  submitCourseForm(formValue: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/course`, formValue);
  }
  createVideo(video: Video): Observable<any> {
    return this.http.post(`${this.apiUrl}/video`, video);
  }
  getAllCategory(token?: string): Observable<any[]> {
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get<any[]>(`${this.apiUrl}/categories`, { headers });
  }
  getAllVideosWithoutLesson(token?: string): Observable<any[]> {
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get<any[]>(`${this.apiUrl}/videos-without-lesson`, { headers });
  }
  checkTitleAvailability(title: string,token?: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/checkTitleAvailability/${title}`);
  }
}
