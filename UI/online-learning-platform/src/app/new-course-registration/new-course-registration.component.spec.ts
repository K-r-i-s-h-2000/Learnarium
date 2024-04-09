import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { NewCourseRegistrationComponent } from './new-course-registration.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InstructorService } from '../instructor.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('NewCourseRegistrationComponent', () => {
  let component: NewCourseRegistrationComponent;
  let fixture: ComponentFixture<NewCourseRegistrationComponent>;
  let mockDialog: any;
  let mockInstructorService: any;

  beforeEach(waitForAsync(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
    mockInstructorService = jasmine.createSpyObj('InstructorService', ['submitCourseForm', 'getAllCategory', 'getAllVideosWithoutLesson']);

    TestBed.configureTestingModule({
      declarations: [], // Add NewCourseRegistrationComponent to declarations
      imports: [NewCourseRegistrationComponent,FormsModule, ReactiveFormsModule, CommonModule, MatSnackBarModule],
      providers: [
        FormBuilder,
        { provide: MatDialog, useValue: mockDialog },
        { provide: InstructorService, useValue: mockInstructorService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCourseRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form properly', () => {
    expect(component.courseForm).toBeDefined();
  });

  it('should add lesson to the form', () => {
    component.addLesson();
    expect(component.lessonsFormArray.length).toBe(1);
  });

  it('should submit course form when valid', fakeAsync(() => {
    const mockFormData = { /* mock form data here */ };
    mockInstructorService.submitCourseForm.and.returnValue(of(null)); // Return an observable

    component.courseForm.setValue(mockFormData);
    component.onSubmit();
    tick();

    expect(mockInstructorService.submitCourseForm).toHaveBeenCalledWith(mockFormData);
    expect(mockDialog.closeAll).toHaveBeenCalled();
  }));

  it('should not submit course form when invalid', () => {
    spyOn(component, 'openSuccessSnackbar');
    component.onSubmit();

    expect(mockInstructorService.submitCourseForm).not.toHaveBeenCalled();
    expect(mockDialog.closeAll).not.toHaveBeenCalled();
    expect(component.openSuccessSnackbar).toHaveBeenCalledWith('Please fill out all required fields correctly.');
  });
});
