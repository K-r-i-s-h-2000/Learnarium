import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingPageComponent } from './landing-page.component';
import { HeaderLandingComponent } from '../header-landing/header-landing.component';
import { ListcategoriesComponent } from '../listcategories/listcategories.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { LandingpageService } from '../landingpage.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let landingpageService: jasmine.SpyObj<LandingpageService>;
  let router:Router;

  beforeEach(async () => {
    // Create a spy object for the service
    const landingpageServiceSpy = jasmine.createSpyObj('LandingpageService', ['getCourseByCategoryId']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [LandingPageComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: LandingpageService, useValue: landingpageServiceSpy }]
    }).compileComponents();

    // Inject the spy object into the component
    landingpageService = TestBed.inject(LandingpageService) as jasmine.SpyObj<LandingpageService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should load courses by category', () => {
    const categoryId = 1;
    const courses = [{ id: 1, title: 'Course 1', level: 'Intermediate', description: 'Description for Course 1' }, { id: 2, title: 'Course 2', level: 'Beginner', description: 'Description for Course 2' }];
    const selectedCategory = { id: 1, categoryName: 'Category 1', image: '/assets/images/category1.jpg' };
  
    // Stub the service method to return the courses
    spyOn(landingpageService, 'getCourseByCategoryId').and.returnValue(of(courses));
  
    // Call the component method
    component.loadCoursesByCategory(categoryId);
  
    // Expectations
    expect(component.showCategoryDetails).toBeTruthy();
    expect(component.selectedCategory).toEqual(selectedCategory);
    expect(component.courses).toEqual(courses);
    expect(landingpageService.getCourseByCategoryId).toHaveBeenCalledWith(categoryId);
  });
  
  

  it('should navigate to course details', () => {
    const courseId = 1;
    spyOn(router, 'navigate'); // Change spyOn to navigateByUrl

    component.gotoCourse(courseId);

    expect(router.navigate).toHaveBeenCalledWith(['/ToCourse',courseId]); // Adjust expectation
    expect(component.showCategoryDetails).toBeTruthy();
  });

  it('should close category details', () => {
    component.closeCategoryDetails();

    expect(component.showCategoryDetails).toBeFalsy();
  });

  // Add more test cases as needed
});

