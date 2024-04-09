import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ListcoursesComponent } from './listcourses.component';
import { ActivatedRoute } from '@angular/router';
import { LandingpageService } from '../landingpage.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('ListcoursesComponent', () => {
  let component: ListcoursesComponent;
  let fixture: ComponentFixture<ListcoursesComponent>;
  let landingpageServiceSpy: jasmine.SpyObj<LandingpageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const landingpageServiceSpyObj = jasmine.createSpyObj('LandingpageService', ['getCourseByCategoryId']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
  
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ListcoursesComponent,CommonModule, HttpClientModule], // Add CommonModule
      providers: [
        { provide: LandingpageService, useValue: landingpageServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } }
      ]
    }).compileComponents();
  }));
  

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcoursesComponent);
    component = fixture.componentInstance;
    landingpageServiceSpy = TestBed.inject(LandingpageService) as jasmine.SpyObj<LandingpageService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch courses on initialization', () => {
    const courseList = [{ id: 1, name: 'Course 1' }, { id: 2, name: 'Course 2' }];
    landingpageServiceSpy.getCourseByCategoryId.and.returnValue(of(courseList));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.courseList).toEqual(courseList);
    expect(landingpageServiceSpy.getCourseByCategoryId).toHaveBeenCalledWith(1);
  });

  it('should navigate to course details', () => {
    const courseId = 1;
    component.gotoCourse(courseId);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/ToCourse', courseId]);
  });
});
