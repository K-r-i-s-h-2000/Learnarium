import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SignupService } from '../signup.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let spinnerService: NgxSpinnerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        SignupComponent,
        MatSnackBarModule,
        ReactiveFormsModule,
        FormsModule,
        NgxSpinnerModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [SignupService, NgxSpinnerService]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    spinnerService = TestBed.inject(NgxSpinnerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate password match', () => {
    const password = component.reactiveForm.controls['password'];
    const retypepassword = component.reactiveForm.controls['retypepassword'];

    password.setValue('password123');
    retypepassword.setValue('password123');
    expect(component.reactiveForm.valid).toBeTruthy();

    retypepassword.setValue('differentpassword');
    expect(component.reactiveForm.hasError('passwordMismatch')).toBeTruthy();
  });

  it('should show student or instructor form based on role selection', () => {
    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('#role');

    selectElement.value = '1';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.showStudentForm).toBeTruthy();
    expect(component.showInstructorForm).toBeFalsy();

    selectElement.value = '2';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.showStudentForm).toBeFalsy();
    expect(component.showInstructorForm).toBeTruthy();
  });

  it('should call spinner service and submit form on onSubmit', fakeAsync(() => {
    spyOn(spinnerService, 'show').and.callThrough();
    spyOn(spinnerService, 'hide').and.callThrough();
    const signupService = TestBed.inject(SignupService);
    const submitSpy = spyOn(signupService, 'submitSignupForm').and.callThrough();

    component.onSubmit();
    expect(spinnerService.show).toHaveBeenCalled();
    tick(2000); // Simulate timeout
    expect(spinnerService.hide).toHaveBeenCalled();
    expect(submitSpy).toHaveBeenCalled();
  }));

  it('should validate date of birth', () => {
    const dateControl = component.reactiveForm.controls['student'].get('studentDateOfBirth');

    // Future date
    dateControl.setValue('2025-01-01');
    expect(dateControl.valid).toBeFalsy();
    expect(dateControl.hasError('futureDate')).toBeTruthy();

    // Past date
    dateControl.setValue('1990-01-01');
    expect(dateControl.valid).toBeTruthy();
  });

  // You can add more test cases to cover edge cases and additional functionalities
});
