import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../instructor.service';
import { LandingpageService } from '../landingpage.service';
import { forkJoin, map, mergeMap } from 'rxjs';
import { HeaderInstructorComponent } from "../header-instructor/header-instructor.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-my-revenue',
    standalone: true,
    templateUrl: './my-revenue.component.html',
    styleUrl: './my-revenue.component.scss',
    imports: [HeaderInstructorComponent,CommonModule]
})
export class MyRevenueComponent implements OnInit{
  instructorId:number;
  courseList:any;
  courseWithStudent:any[];
  studentList:any[];
  courseId:number;
  totalProfit:number;
  constructor(private instructorService:InstructorService,private landingpageService:LandingpageService){}

  ngOnInit(): void {
    this.instructorId = parseInt(localStorage.getItem('instructorId'), 10);

    this.instructorService.getCourseByInstructorId(this.instructorId)
      .pipe(
        mergeMap((courseDetails: any[]) => {
          // Map each course to an observable that fetches its enrolled students
          const courseObservables = courseDetails.map(course => {
            return this.landingpageService.getEnrolledStudentsByCourseId(course.id)
              .pipe(
                map(studentList => ({ ...course, studentList }))
              );
          });
  
          // Combine all observables into a single observable
          return forkJoin(courseObservables);
        })
      )
      .subscribe(
        (coursesWithStudents: any[]) => {
          // Access the courses and their corresponding student lists here
          console.log('Courses with students:', coursesWithStudents);
          this.courseWithStudent = coursesWithStudents;
          this.totalProfit = 0;
          for (const course of this.courseWithStudent) {
           this.totalProfit += course.fees * course.studentList.length;
          }
        },
        (error) => {
          console.error(error);
        }
      );
      
  }
  getTotalProfit(): number {
    let totalProfit = 0;
    for (const course of this.courseWithStudent) {
        totalProfit += course.fees * course.studentList.length;
    }
    return totalProfit;
}


}
