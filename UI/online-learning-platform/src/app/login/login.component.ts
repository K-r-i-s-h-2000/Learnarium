import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from "../header/header.component";
@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterOutlet, HeaderComponent]
})
export class LoginComponent implements OnInit {

  title = 'ReactiveForms';
  reactiveForm: FormGroup;
  formStatus: string;
  responseData: any;
  _dialog:MatDialog;
  constructor( private snackBar: MatSnackBar,private loginService: LoginService,private router: Router,public dialog: MatDialog) {this._dialog=dialog;}

  ngOnInit() {
    localStorage.clear();
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
      acceptTerms: new FormControl(false, Validators.requiredTrue) // Required to be checked
    });

    this.reactiveForm.statusChanges.subscribe((value) => {
      console.log(value);
      this.formStatus = value;
    });
  }

  onSubmit() {
    
    this.loginService.submitLoginForm(this.reactiveForm.getRawValue()).subscribe(
      (data) => {
        console.log(data);
        if(data && data.token){
          this.responseData=data;
          localStorage.setItem("token",this.responseData.token);
  
  
  
          localStorage.setItem("user_details",JSON.stringify(data));
  
          const studentId = data.studentId;
          localStorage.setItem("studentId", studentId);
  
  
          const instructorId = data.instructorId;
          localStorage.setItem('instructorId',instructorId);
  
          const instructorName = data.instructorName;
          localStorage.setItem('instructorName',instructorName);
  
          const instructorDescription = data.instructorDescription;
          localStorage.setItem('instructorDescription',instructorDescription);
  
          this.handleLoginSuccess(data);
        } else {
          console.error('Invalid response data:', data);
          this.openSuccessSnackbar('Invalid response data!');
        }
      },
      (error) => {
        this.openSuccessSnackbar('invalid credentials!');

        console.error('Error:', error);
      }
    );
  }
  handleLoginSuccess(data: any) {
    const role = data.role;

    if (role === 'STUDENT') {
      this.router.navigate(['/LandingPage']);
    } else if (role === 'INSTRUCTOR') {
      this.router.navigate(['/Instructor']);
    } else if (role === 'ADMIN'){
      this.router.navigate(['/Course']);
    }
  }
  forgotPassword() {

  this._dialog.open(ForgotpasswordComponent, {
      height: '200px',
      width: '300px',
    });
    }
    openSuccessSnackbar(message: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 3000, // Adjust the duration as needed
        verticalPosition: 'top', // Position the snackbar at the top
        panelClass: ['custom-snackbar'], // Add a custom CSS class for styling
      });
    }
}
