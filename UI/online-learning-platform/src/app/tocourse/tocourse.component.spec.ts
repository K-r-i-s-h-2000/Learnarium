import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TocourseComponent } from './tocourse.component';
import { LandingpageService } from '../landingpage.service';
import { of } from 'rxjs';

describe('TocourseComponent', () => {
  let component: TocourseComponent;
  let fixture: ComponentFixture<TocourseComponent>;
  let landingpageService: LandingpageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TocourseComponent,HttpClientTestingModule, RouterTestingModule],
      declarations: [],
      providers: [LandingpageService] // Provide LandingpageService
    }).compileComponents();

    fixture = TestBed.createComponent(TocourseComponent);
    component = fixture.componentInstance;
    landingpageService = TestBed.inject(LandingpageService); // Inject LandingpageService

    // Mock the landingpageService methods
    spyOn(landingpageService, 'getCourseById').and.returnValue(of({ title: 'Test Course', description: 'Test Description', level: 'Beginner', fees: 1000, id: 1, lessons: [] }));
    spyOn(landingpageService, 'getEnrolledCourses').and.returnValue(of([{ id: 1 }, { id: 2 }])); // Assuming the user is enrolled in courses with IDs 1 and 2
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enroll in a course', () => {
    const routerSpy = spyOn(component['router'], 'navigate'); // Spy on the router's navigate method

    component.enrollNow(1);
    
    // Check if the router's navigate method was called with the correct route
    expect(routerSpy).toHaveBeenCalledWith(['/Payment']);
    expect(component.isEnrolled).toBeTrue(); // Assuming isEnrolled should be set to true after enrolling
  });

  it('should navigate to a course', () => {
    const routerSpy = spyOn(component['router'], 'navigate'); // Spy on the router's navigate method

    component.goToCourse(1);

    // Check if the router's navigate method was called with the correct route
    expect(routerSpy).toHaveBeenCalledWith(['/ToCoursePaid', 1]);
  });

  it('should check enrollment status', () => {
    component.ngOnInit(); // Call ngOnInit to trigger checkEnrollmentStatus
    
    // Check if the isEnrolled property is set correctly based on the mocked response from the service
    expect(component.isEnrolled).toBeTrue(); // Assuming the user is enrolled in a course with ID 1
  });
});
