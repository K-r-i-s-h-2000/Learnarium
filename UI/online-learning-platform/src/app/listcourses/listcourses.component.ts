import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingpageService } from '../landingpage.service';
import { CommonModule } from '@angular/common';
import { HeaderLandingComponent } from "../header-landing/header-landing.component";

@Component({
    selector: 'app-listcourses',
    standalone: true,
    templateUrl: './listcourses.component.html',
    styleUrl: './listcourses.component.scss',
    imports: [CommonModule, HeaderLandingComponent]
})
export class ListcoursesComponent implements OnInit{
  categoryId : number;
  courseList : any;
  constructor(private route: ActivatedRoute, private landingpageService:LandingpageService, private router:Router){}
  ngOnInit(): void{
    this.route.params.subscribe(params =>{
      this.categoryId = +params['id'];
      this.landingpageService.getCourseByCategoryId(this.categoryId).subscribe(
        (details)=>{
          this.courseList = details;
          console.log(details);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }
  gotoCourse(courseId: number) {
    this.router.navigate(['/ToCourse',courseId]);
  }

}
