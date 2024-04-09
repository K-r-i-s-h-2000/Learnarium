import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  private apiUrl = 'http://localhost:8080/online-learning-platform/users';
  private baseUrl='http://localhost:8080/online-learning-platform';
  private apiUrl3 ='http://localhost:8080/online-learning-platform/student/update/';
  private userId: string = '';
  private studentName='';
  private studentId: string = '';
  private studentAddress:string = '';
  private role:  string='';

  constructor(private http: HttpClient) { }
  submitLoginForm(formValue: any): Observable<any> {
    return this.http.post('http://localhost:8080/online-learning-platform/auth/authenticate', formValue).pipe(
      map((response: any) => {
        // Assuming the user ID is returned in the response upon successful authentication
        this.userId = response.id;
        this.studentId=response.studentId;
        this.role=response.role;
        localStorage.setItem('studentId',this.studentId);
        localStorage.setItem('userRole',this.role);
        this.studentName=response.studentName;
        this.studentAddress=response.studentAddress;
        console.log(response);
        console.log(this.userId); // Store the user ID
        localStorage.setItem('token', response.token); // Store the token in localStorage
        return response;
      })
    );
  }

  changePassword(formValue: any): Observable<any> {

    return this.http.post(this.apiUrl, formValue);
  }
  isLoggedIn()
  {
    return localStorage.getItem('token')!=null;
  }
  getUserId(): any {
    return this.userId;
  }
  getStudentName():any{
    return this.studentName;
  }
  getRole():any{
    return this.role;
  }

  forgotPassword(formValue: any): Observable<any>{
    const processUrl=`${this.baseUrl}/auth/forgot-password`
    return this.http.post(processUrl,formValue)

  }viewProfile
  (updatedUserData: any): Observable<any> {
    console.log(updatedUserData);
    return this.http.get(`${this.baseUrl}/Student/${this.studentId}`, updatedUserData);
  }
  payment(formValue: any): Observable<any> {
    const courseId=localStorage.getItem('courseId');
    const processUrl = `http://localhost:8080/online-learning-platform/payments/process/${courseId}`;
    const token = localStorage.getItem('token');
    token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.post(processUrl, formValue);

  }

}
