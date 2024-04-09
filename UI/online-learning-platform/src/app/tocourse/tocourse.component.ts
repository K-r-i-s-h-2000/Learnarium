import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingpageService } from '../landingpage.service';
import { HeaderLandingComponent } from "../header-landing/header-landing.component";
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-tocourse',
    standalone: true,
    templateUrl: './tocourse.component.html',
    styleUrl: './tocourse.component.scss',
    imports: [HeaderLandingComponent,CommonModule]
})
export class TocourseComponent {
  studentId:any;
  currentCourseId:number;
  courseDescription: any;
  courseName: any;
  courseId: number;
  course: any;
  lessonList : any;
  isEnrolled: boolean = false; 
  constructor(private route: ActivatedRoute,private http: HttpClient,private router:Router, private landingpageService:LandingpageService){}
  ngOnInit(): void{
    this.route.params.subscribe(params => {
      this.courseId = +params['id']; 
      this.landingpageService.getCourseById(this.courseId).subscribe(
        (details) => {
          this.course = details;
          console.log('Course Details:', this.course);
          this.lessonList = this.course.lessons;
          localStorage.setItem('currentCourseId',this.course.id);
          // console.log("Lessons in this course",this.lessonList);
          // if(this.lessonList.length == '0'){
          //   // this.openSuccessSnackbar('Restaurant new to listing , Items not yet added!');

          // }

        }
      )
    })
    this.checkEnrollmentStatus();
  }
  enrollNow(courseId:any) {
    localStorage.setItem("CourseId",courseId);
    console.log("Enroll button is clicked");
    this.router.navigate(['/Payment']);
    this.isEnrolled=true;
  }
  goToCourse(courseId:any) {
    localStorage.setItem("CourseId",courseId);
    console.log("Course button is clicked");
    this.router.navigate(['/ToCoursePaid',courseId]);
  }
  checkEnrollmentStatus(): void {
    this.studentId=localStorage.getItem('studentId');
    this.landingpageService.getEnrolledCourses(this.studentId).subscribe(
      (enrolledCourses: any[]) => {
        this.currentCourseId=parseInt(localStorage.getItem('currentCourseId'),10);
        // Check if the current course is in the enrolled courses list
        this.isEnrolled = enrolledCourses.some(enrolledCourse => enrolledCourse.id === this.currentCourseId);
        console.log(this.isEnrolled);
      },
      error => {
        // Handle the error if needed
        console.error('Error fetching enrolled courses:', error);
      }
    );
  }
}
