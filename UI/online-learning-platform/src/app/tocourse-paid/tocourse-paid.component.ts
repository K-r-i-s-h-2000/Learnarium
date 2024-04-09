import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingpageService } from '../landingpage.service';
import { HeaderLandingComponent } from "../header-landing/header-landing.component";
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { YoutubeComponent } from "../youtube/youtube.component";
import { HeaderInstructorComponent } from "../header-instructor/header-instructor.component";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-tocourse-paid',
    standalone: true,
    templateUrl: './tocourse-paid.component.html',
    styleUrl: './tocourse-paid.component.scss',
    imports: [HeaderLandingComponent, CommonModule, YoutubeComponent, HeaderInstructorComponent, HeaderComponent]
})
export class TocoursePaidComponent {
  courseDescription: any;
  courseName: any;
  courseId: any;
  course: any;
  lessonList : any;
  showLessonDetails: boolean = false;
  showStudentDetails:boolean = false;
  userRole: any;
  studentList:any;
  isLoggedIn: Boolean = false;
  constructor(private snackBar:MatSnackBar,private route: ActivatedRoute,private http: HttpClient,private router:Router, private landingpageService:LandingpageService){}
  
  ngOnInit(): void{
    this.userRole=localStorage.getItem('userRole');
    this.route.params.subscribe(params => {
      this.courseId = +params['id']; 
      this.landingpageService.getCourseById(this.courseId).subscribe(
        (details) => {
          this.course = details;
          console.log(details);
          this.lessonList = this.course.lessons;
          console.log("Lessons in this course",this.lessonList);
          localStorage.setItem("CourseId",this.course.id);

        }
      )
    })
    this.courseId= localStorage.getItem("CourseId")
    
   
  }
  toggleLessonDetails() {
    this.showLessonDetails = !this.showLessonDetails;
  }
  toggleStudentDetails(courseId:any) {
    this.showStudentDetails = !this.showStudentDetails;
    this.landingpageService.getEnrolledStudentsByCourseId(courseId).subscribe(
      (details) =>{
        this.studentList=details;
        console.log('student List:',this.studentList);
      }
    )
  }

  openSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'center' as MatSnackBarVerticalPosition,
      panelClass: ['custom-snackbar'],
    });
  }
}
