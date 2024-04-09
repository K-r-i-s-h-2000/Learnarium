import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupService } from '../signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from '../header/header.component';
import {  NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-signup',
    standalone: true,
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
    imports: [CommonModule, RouterLink, RouterOutlet, FormsModule, ReactiveFormsModule, HeaderComponent,NgxSpinnerModule]
})
export class SignupComponent implements OnInit {
  errorMessage: any;
  // showSpinner:boolean =false;

  constructor( private snackBar: MatSnackBar,private signupService: SignupService,private router :Router,private spinner:NgxSpinnerService) {}

  showSpinner() {
    this.spinner.show();
    // Some asynchronous operation
    setTimeout(() => {
      this.hideSpinner();
    }, 2000);
  }

  hideSpinner() {
    this.spinner.hide();
  }
  showStudentForm = false;
  showInstructorForm = false;
  title='ReactiveForms';
  reactiveForm: FormGroup;
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^[A-Z][a-zA-Z]{0,8}$/) // First letter capital, 1 to 9 characters
      ])),
      
      lastname: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^[A-Za-z]{1,9}$/) // Allows only alphabetic characters and limits length to 1-9
      ])),
      email: new FormControl(null, [Validators.email, Validators.required]),
      mobileNumber: new FormControl(null, [
        Validators.pattern(/^[0-9]{10}$/), // Accepts only numbers and validates length to 10
        Validators.required
      ]),
      acceptTerms: new FormControl(null, Validators.required),

      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(8), // Minimum length requirement
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) // Strong password pattern
      ])),
      retypepassword: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      student: new FormGroup({
      studentName: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Z][a-zA-Z\s]*$/) // EnsuresStudent name starts with a capital letter and contains only letters
        ])),
      studentAddress: new FormControl(null, Validators.pattern(/^[a-zA-Z0-9, ]*$/)),
      studentEmail: new FormControl(null, Validators.email), // Validates email format
      studentDateOfBirth: new FormControl(null, [Validators.required, this.validateDOB]),
      studentGender: new FormControl(null),
      }),
      instructor: new FormGroup({
        instructorName:new FormControl(null, Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Z][a-zA-Z]*$/) // EnsuresStudent name starts with a capital letter and contains only letters
        ])),
        instructorDescription: new FormControl(null, Validators.pattern(/^[a-zA-Z0-9, ]*$/)),
        instructorEmail: new FormControl(null, Validators.email), // Validates email format
        instructorGender: new FormControl(null),
        website: new FormControl(null, [Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]),
      }),



    }, { validators: this.passwordMatchValidator });
  }




  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const retypepassword = control.get('retypepassword');

    if (password && retypepassword && password.value !== retypepassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
  getDetails(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.showStudentForm = value === '1';
    this.showInstructorForm = value === '2';
    // Disable validations for fields not currently shown
  if (!this.showStudentForm) {
    this.reactiveForm.get('student').clearValidators();
    this.reactiveForm.get('student').updateValueAndValidity();
  }
  if (!this.showInstructorForm) {
    this.reactiveForm.get('instructor').clearValidators();
    this.reactiveForm.get('instructor').updateValueAndValidity();
  }
  }


  //public passwordMatchError: string = '';

  // onSubmit(){
  //   this.signupService.submitSignupForm(this.reactiveForm.getRawValue()).subscribe(
  //     (data) => {
  //       this.openSuccessSnackbar("Registration Completed Successfully");
  //       this.router.navigate(['/Login']);
  //       console.log(data);
  //       console.log(this.reactiveForm)
  //     },
  //     (error) => {
  //       this.openSuccessSnackbar("Registration Failed");

  //       console.error('Error:', error);
  //       console.log(this.reactiveForm)
  //     }
  //   );
  // }
  onSubmit() {
   
  
    this.showSpinner();
    this.signupService.submitSignupForm(this.reactiveForm.getRawValue()).subscribe(
      (data) => {
        this.hideSpinner(); // Toggle off the spinner upon successful submission
        this.router.navigate(['/Login']);
        const message = data.message; // Assuming the message is stored in the 'message' field
        this.openSuccessSnackbar(message);
      },
      (error) => {
        this.hideSpinner(); // Toggle off the spinner upon error
        if (error.error.message === 'User with the provided email already exists or is active.') {
          this.openSuccessSnackbar(error.error.message);
        } else {
          this.openSuccessSnackbar('An error occurred.');
        }
        console.error('Error:', error);
      }
    );
  }
  
  validateDOB(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate > today) {
      return { 'futureDate': true };
    }

    return null;
  }
  openSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
      verticalPosition: 'top', // Position the snackbar at the top
      panelClass: ['custom-snackbar'], // Add a custom CSS class for styling
    });
  }
}





