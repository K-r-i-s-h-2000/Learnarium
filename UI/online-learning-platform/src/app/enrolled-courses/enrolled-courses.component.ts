import { Component, OnInit } from '@angular/core';
import { LandingpageService } from '../landingpage.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { HeaderLandingComponent } from "../header-landing/header-landing.component";


@Component({
    selector: 'app-enrolled-courses',
    standalone: true,
    templateUrl: './enrolled-courses.component.html',
    styleUrl: './enrolled-courses.component.scss',
    imports: [CommonModule, MatCardModule, HeaderLandingComponent]
})
export class EnrolledCoursesComponent implements OnInit{
  studentId:any;
  courseList:any;
  chunkedCourses: any[];
  constructor(private router:Router,private landingpageService:LandingpageService){

  }
  ngOnInit(){
    this.studentId=localStorage.getItem('studentId');
    this.landingpageService.getEnrolledCourses(this.studentId).subscribe(
      (details)=>{
        this.courseList = details;
        console.log(details);
        this.chunkedCourses = this.chunkArray(this.courseList,3);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  chunkArray(arr: any[], chunkSize: number): any[] {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }
  navigate(courseId:any){
    this.router.navigate(['/ToCoursePaid',courseId]);
  }
}
  


