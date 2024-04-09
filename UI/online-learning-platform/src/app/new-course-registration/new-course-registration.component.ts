import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InstructorService } from '../instructor.service';
import { CommonModule } from '@angular/common';
import { uniqueTitleValidator } from '../validator';

@Component({
  selector: 'app-new-course-registration',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './new-course-registration.component.html',
  styleUrl: './new-course-registration.component.scss'
})

export class NewCourseRegistrationComponent {
  categories: any[];
  _dialog:MatDialog;
  videos:any[];

  constructor(private instructorService:InstructorService, private snackBar: MatSnackBar,public dialog: MatDialog,private formBuilder: FormBuilder,private router: Router){
    this._dialog=dialog;
    
  }

lessonFormControl(controlName: string, index: number): FormControl {
  return (this.lessonsFormArray.at(index) as FormGroup).get(controlName) as FormControl;
}
courseForm: FormGroup;

ngOnInit() {
  this.initializeForm();
  this.loadCategories();
  this.loadVideosWithoutLesson();
}

initializeForm() {
  this.courseForm = this.formBuilder.group({
    title: ['',[ Validators.required,Validators.maxLength(50),uniqueTitleValidator(this.instructorService)]],
    description: ['',[Validators.required,Validators.maxLength(250)]],
    categoryId: [null, Validators.required],
    lessons: this.formBuilder.array([]),
    level: [null, Validators.required],
    fees: [null, [Validators.required,Validators.min(0), Validators.max(2000)]],
    instructor: [null, Validators.required]
  });
}

get lessonsFormArray() {
  return this.courseForm.get('lessons') as FormArray;
}

addLesson() {
  const lessonFormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    videoId: [null, Validators.required]
  });

  this.lessonsFormArray.push(lessonFormGroup);
}

onSubmit() {


this.courseForm.patchValue({ instructor: localStorage.getItem('instructorId') });

  if (this.courseForm.valid) {
    // Call the signUpUser method from the SignupService
    this.instructorService.submitCourseForm(this.courseForm.value).subscribe(
      (data) => {
        console.log(data);
        this._dialog.closeAll();
        this.openSuccessSnackbar("Regsitration Successful!.");


      },
      (error) => {
        this.openSuccessSnackbar("Error! Failed to update profile.");

        console.log(error);
      }
    );
  } else {
    this.openSuccessSnackbar("Please fill out all required fields correctly.");
    // Or handle validation error as needed
  }
}
openSuccessSnackbar(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 3000, // Adjust the duration as needed
    verticalPosition: 'top', // Position the snackbar at the top
    panelClass: ['custom-snackbar'], // Add a custom CSS class for styling
  });
}
loadCategories(): void {
  this.instructorService.getAllCategory().subscribe(
    (categories) => {
      this.categories = categories;
      console.log(this.categories);
    },
    (error) => {
      console.error('Error loading categories:', error);
    }
  );
}

loadVideosWithoutLesson():void{
  this.instructorService.getAllVideosWithoutLesson().subscribe((videos)=>{
    this.videos = videos;
    console.log(this.videos);
  })
}

}


