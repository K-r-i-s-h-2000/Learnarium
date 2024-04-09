import { Component } from '@angular/core';
import { YoutubeComponent } from '../youtube/youtube.component';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { LandingpageService } from '../landingpage.service';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-course',
    standalone: true,
    templateUrl: './course.component.html',
    styleUrl: './course.component.scss',
    imports: [YoutubeComponent, CommonModule, HeaderComponent,MatCardModule]
})
export class CourseComponent {

  studentId:any;
  courseList:any;
  chunkedCourses: any[];
  role:any;
  constructor(private router:Router,private landingpageService:LandingpageService){
 
  }
  ngOnInit(){
    this.role="USER";
    localStorage.setItem('userRole',this.role);
    this.landingpageService.getCoursesWithZeroFees().subscribe(
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
