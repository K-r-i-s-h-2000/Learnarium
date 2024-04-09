import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{
  title="PaymentForm";
  reactiveform:FormGroup;
  studentId:any;
  courseId: any;
  obj2: any;
  showSpinner: boolean = false;
  constructor(private snackBar:MatSnackBar,private router:Router,private dialog: MatDialog,private fb: FormBuilder, private loginService:LoginService, private paymentService:PaymentService){

  }
  ngOnInit(): void {
      this.reactiveform = this.fb.group({
        cardNumber: [null, [Validators.required, Validators.pattern(/^\d{16}$/)]],
        expirationDate: [null, [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
        cvv: [null, [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
      })
  }

  closeForm(){
    this.dialog.closeAll();
  }
  paymentSubmit() {
    if (this.reactiveform.valid) {
      this.showSpinner=true;
      this.courseId = localStorage.getItem('CourseId');
      this.studentId = localStorage.getItem('studentId');
      const courseData = {
        studentId:this.studentId,
        courseId: this.courseId

      };
  
      this.paymentService.createEnrollment(courseData).subscribe((data: any) => {
        this.obj2 = data;
        console.log(this.obj2);
        localStorage.setItem('paidCourseId', this.obj2.courseId);
        const paidCourseId = parseInt(localStorage.getItem('paidCourseId'), 10);
        this.router.navigate(['/ToCoursePaid',paidCourseId]);

      });
    } else {
      this.openSuccessSnackbar('Please enter valid values.');
    }
  }
  openSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'center' as MatSnackBarVerticalPosition,
      panelClass: ['custom-snackbar'],
    });
  }


}
