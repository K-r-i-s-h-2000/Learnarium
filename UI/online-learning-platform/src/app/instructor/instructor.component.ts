import { Component, OnInit } from '@angular/core';
import { HeaderInstructorComponent } from "../header-instructor/header-instructor.component";
import { InstructorService } from '../instructor.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewCourseRegistrationComponent } from '../new-course-registration/new-course-registration.component';
import { MatDialog } from '@angular/material/dialog';
import { NewVideoRegistrationComponent } from '../new-video-registration/new-video-registration.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { VideoUploadComponent } from '../video-upload/video-upload.component';

@Component({
    selector: 'app-instructor',
    standalone: true,
    templateUrl: './instructor.component.html',
    styleUrl: './instructor.component.scss',
    imports: [HeaderInstructorComponent,CommonModule,ReactiveFormsModule,FormsModule]
})
export class InstructorComponent implements OnInit{
  
  instructorId : number;
  courseList : any;
  newCourse: any = {
    title: '',
    description: ''
    // Add more fields as needed
  };
  _dialog:MatDialog;
  reactiveForm: FormGroup;
  private videoIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  constructor(public dialog: MatDialog,private router:Router,private instructorService:InstructorService,private formBuilder:FormBuilder){
    this._dialog=dialog;
  }

  ngOnInit(): void {
      this.getCourseByInstructor();

  }
  gotoCourse(courseId: number) {
    this.router.navigate(['/ToCoursePaid',courseId]);
  }

  getCourseByInstructor(){
    this.instructorId=parseInt(localStorage.getItem('instructorId'),10);
      this.instructorService.getCourseByInstructorId(this.instructorId).subscribe(
        (details)=>{
          this.courseList=details;
          console.log(details);
        },
        (error) => {
          console.error(error);
        }
      );
  }
  openNewCourseForm() {
    this.dialog.open(NewCourseRegistrationComponent, {
      height: '500px',
      width: '600px',
    });
    
  }


  addNewVideo() {
    this.dialog.open(VideoUploadComponent, {
      height: '400px',
      width: '400px',
    });
  }
  openNewVideoForm() {
    let dialogRef = this.dialog.open(NewVideoRegistrationComponent, {
      height: '300px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((videoId: number) => {
      // Emit the videoId using the BehaviorSubject
      this.videoIdSubject.next(videoId);
    });

    // Return an observable that emits the videoId when the dialog is closed
    return this.videoIdSubject.asObservable();
  }
}
