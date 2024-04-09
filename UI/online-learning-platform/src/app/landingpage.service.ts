import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingpageService {
  private apiUrl = 'http://localhost:8080/online-learning-platform/auth';

  constructor(private http : HttpClient) { }

  getCourses(token?: string): Observable<any[]> {
    const headers = token ? new HttpHeaders({Authorization: `Bearer ${token}`}): undefined;
    return this.http.get<any>(`${this.apiUrl}/courses`,{headers});
  }
  getCourseById(courseId:number,token?:string): Observable<any>{
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get(`${this.apiUrl}/course/${courseId}`,{headers});
  } 
  getCourseByCategoryId(categoryId:number,token?:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/course/category/${categoryId}`);
  }
  getEnrolledCourses(studentId:number,token?:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/enrollment/${studentId}`);
  }
  getEnrolledStudentsByCourseId(courseId:number,token?:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/enrollment/instructor/${courseId}`);
  }
  getCoursesWithZeroFees():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/courses-with-zero-fees`);
  }
}
