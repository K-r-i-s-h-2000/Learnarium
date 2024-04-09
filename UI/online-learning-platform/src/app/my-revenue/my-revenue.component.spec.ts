import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRevenueComponent } from './my-revenue.component';
import { InstructorService } from '../instructor.service';
import { LandingpageService } from '../landingpage.service';
import { of } from 'rxjs';

describe('MyRevenueComponent', () => {
  let component: MyRevenueComponent;
  let fixture: ComponentFixture<MyRevenueComponent>;
  let mockInstructorService: Partial<InstructorService>;
  let mockLandingpageService: Partial<LandingpageService>;

  beforeEach(async () => {
    mockInstructorService = {
      getCourseByInstructorId: jasmine.createSpy().and.returnValue(of([
        { id: 1, title: 'Course 1', fees: 100, studentList: [1, 2, 3] },
        { id: 2, title: 'Course 2', fees: 150, studentList: [4, 5] }
      ]))
    };

    mockLandingpageService = {
      getEnrolledStudentsByCourseId: jasmine.createSpy().and.returnValue(of([1, 2, 3, 4, 5]))
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports:[MyRevenueComponent],
      providers: [
        { provide: InstructorService, useValue: mockInstructorService },
        { provide: LandingpageService, useValue: mockLandingpageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total profit correctly in ngOnInit', () => {
    // Trigger ngOnInit
    component.ngOnInit();
    // Expect total profit to be calculated correctly based on mock data
    expect(component.totalProfit).toEqual(5 * 100 + 3 * 150);// 5 students enrolled in Course 1, 3 in Course 2
  });

  it('should calculate total profit correctly in getTotalProfit', () => {
    // Manually set courseWithStudent data
    component.courseWithStudent = [
      { id: 1, title: 'Course 1', fees: 100, studentList: [1, 2, 3] },
      { id: 2, title: 'Course 2', fees: 150, studentList: [4, 5] }
    ];
    // Call getTotalProfit method
    const totalProfit = component.getTotalProfit();
    // Expect total profit to be calculated correctly based on mock data
    expect(totalProfit).toEqual(5 * 100 + 3 * 150); // 5 students enrolled in Course 1, 3 in Course 2
  });
});
