import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TocoursePaidComponent } from './tocourse-paid.component';
import { LandingpageService } from '../landingpage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ActivatedRoute, ParamMap, Route, Router, convertToParamMap } from '@angular/router';

describe('TocoursePaidComponent', () => {
  let component: TocoursePaidComponent;
  let fixture: ComponentFixture<TocoursePaidComponent>;
  let landingpageService: LandingpageService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [TocoursePaidComponent, RouterTestingModule, HttpClientTestingModule, MatSnackBarModule], // Import necessary modules
      providers: [LandingpageService],
    }).compileComponents();

    fixture = TestBed.createComponent(TocoursePaidComponent);
    component = fixture.componentInstance;
    landingpageService = TestBed.inject(LandingpageService);
    activatedRoute = TestBed.inject(ActivatedRoute);


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle lesson details', () => {
    expect(component.showLessonDetails).toBeFalse(); // Initially, showLessonDetails should be false

    component.toggleLessonDetails();
    expect(component.showLessonDetails).toBeTrue(); // After toggling, showLessonDetails should be true

    component.toggleLessonDetails();
    expect(component.showLessonDetails).toBeFalse(); // After toggling again, showLessonDetails should be false
  });

  it('should toggle student details', () => {
    expect(component.showStudentDetails).toBeFalse(); // Initially, showStudentDetails should be false

    spyOn(landingpageService, 'getEnrolledStudentsByCourseId').and.returnValue(of([])); // Stub the service call

    component.toggleStudentDetails(1);
    expect(component.showStudentDetails).toBeTrue(); // After toggling, showStudentDetails should be true

    component.toggleStudentDetails(1);
    expect(component.showStudentDetails).toBeFalse(); // After toggling again, showStudentDetails should be false
  });

  it('should call landingpageService and set course details in ngOnInit', () => {
    const courseId = '1'; // Change courseId to string as it comes from route params
    const courseDetails = {
      id: 1,
      title: 'Test Course',
      description: 'Test Description',
      level: 'Beginner',
      lessons: [{ title: 'Lesson 1', description: 'Lesson 1 Description', youtubeVideoId: 'xyz123' }],
    };

    // Set route params
    const paramMap = convertToParamMap({ id: courseId });
    spyOnProperty(activatedRoute, 'paramMap').and.returnValue(of(paramMap));

    spyOn(landingpageService, 'getCourseById').and.callFake((id) => {
        console.log('Received courseId:', id); // Log the received courseId
        return of(courseDetails);
    });

    component.ngOnInit();

    expect(landingpageService.getCourseById).toHaveBeenCalledWith(1); // Ensure courseId is correctly converted to a number
    expect(component.course).toEqual(courseDetails); // Course details should be set
    expect(component.lessonList).toEqual(courseDetails.lessons); // Lesson list should be set
});


});
