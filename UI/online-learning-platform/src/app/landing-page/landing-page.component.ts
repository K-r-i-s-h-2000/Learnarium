import { Component, OnInit } from '@angular/core';
import { HeaderLandingComponent } from "../header-landing/header-landing.component";
import { CommonModule } from '@angular/common';
import { LandingpageService } from '../landingpage.service';
import { Route, Router } from '@angular/router';
import { ListcategoriesComponent } from "../listcategories/listcategories.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
    imports: [CommonModule, HeaderLandingComponent, ListcategoriesComponent,MatCardModule,MatGridListModule]
})
export class LandingPageComponent implements OnInit{


  courses: any[] =[];
selectedCategory: any;
categories:any;
showCategoryDetails: boolean = false;
  constructor(private landingpageService:LandingpageService, private router: Router,private http:HttpClient){

  }

  ngOnInit(){
    this.listallCategories();


  }


  gotoCourse(courseId: number) {
    this.router.navigate(['/ToCourse',courseId]);
    this.showCategoryDetails = true;
  }
  listallCategories(){
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
  // loadCoursesByCategory(categoryId:number):void{
  //   this.showCategoryDetails = true;
  //   this.selectedCategory=this.categories.find(category => category.id === categoryId);
  //   this.landingpageService.getCourseByCategoryId(categoryId).subscribe((courses)=>{
  //     this.courses = courses;
  //   })
  // }
  loadCoursesByCategory(categoryId:number):void{
    this.showCategoryDetails = true;
  
    // Check if categories is defined and not empty
    if (this.categories && this.categories.length > 0) {
      this.selectedCategory = this.categories.find(category => category.id === categoryId);
      if (this.selectedCategory) {
        this.landingpageService.getCourseByCategoryId(categoryId).subscribe((courses)=>{
          this.courses = courses;
        });
      } else {
        console.error('Category not found');
      }
    } else {
      console.error('Categories not initialized or empty');
    }
  }
  

closeCategoryDetails() {
  this.showCategoryDetails = false;
}

}
