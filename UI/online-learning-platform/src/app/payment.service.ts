import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constUrl = "http://localhost:8080/online-learning-platform/auth"
  constructor(private http:HttpClient) { }

  createEnrollment(courseData:{studentId:number;courseId:number}): Observable<any>{
    return this.http.post<any>(this.constUrl+`/enrollment/${courseData.studentId}/course?courseId=${courseData.courseId}`,courseData);
  }
}

