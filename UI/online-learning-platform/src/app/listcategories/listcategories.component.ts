import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderLandingComponent } from "../header-landing/header-landing.component";
import { ListcoursesComponent } from "../listcourses/listcourses.component";
import { LandingpageService } from '../landingpage.service';

@Component({
    selector: 'app-listcategories',
    standalone: true,
    templateUrl: './listcategories.component.html',
    styleUrl: './listcategories.component.scss',
    imports: [CommonModule, HeaderLandingComponent, ListcoursesComponent]
})
export class ListcategoriesComponent implements OnInit{
  courses: any[] =[];
  selectedCategory: any;

  constructor(private router:Router,private http : HttpClient, private landingpageService:LandingpageService){

  }

  categories:any[] = [];
  ngOnInit(): void {
      const apiUrl = 'http://localhost:8080/online-learning-platform/auth/categories';
      const token = localStorage.getItem('token');

      const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
      
      this.http.get<any[]>(apiUrl, {headers }).subscribe(
        (data) => {
          console.log(data);
          this.categories = data;
        },
        (error) => {
          console.error(error);
        }
      );
  }
  loadCoursesByCategory(categoryId:number):void{
    this.selectedCategory=this.categories.find(category => category.id === categoryId);
    this.landingpageService.getCourseByCategoryId(categoryId).subscribe((courses)=>{
      this.courses = courses;
    })
  }
  gotoCourse(courseId: number) {
    this.router.navigate(['/ToCourse',courseId]);
  }

}
