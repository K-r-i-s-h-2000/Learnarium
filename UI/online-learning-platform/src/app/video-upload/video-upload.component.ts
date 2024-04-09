import { Component, Inject } from '@angular/core';
import { Video } from '../course.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewVideoRegistrationComponent } from '../new-video-registration/new-video-registration.component';
import { InstructorService } from '../instructor.service';
import { VideoService } from '../video.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './video-upload.component.html',
  styleUrl: './video-upload.component.scss'

})

export class VideoUploadComponent {
  videoForm: FormGroup;
  newVideo: any;
  newVideoId:number;
  selectedFile: File;
  uploadFileOption: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<NewVideoRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private instructorService: InstructorService,
    private dialog: MatDialog,
    private videoService:VideoService,
    private snackBar:MatSnackBar
  ) {
    this.videoForm = this.formBuilder.group({
      title: [''],
      // Add other properties as needed
    });
  }

  ngOnInit(): void {
    this.videoForm = this.formBuilder.group({
      title: ['', Validators.required],
      link: ['', Validators.required],
    });
  }


  onCancel() {
    this.dialogRef.close();
    this.dialog.closeAll(); 
  }
  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    this.uploadFileOption = false;  
  }
  onSubmit(): void {
    if (this.uploadFileOption) {
      this.onSubmit1();
    } else {
      this.onSubmit2();
    }
  }
  onSubmit1() {
    if (this.videoForm.valid) {
      const newVideo: Video = this.videoForm.value;

      // Assuming the server generates an ID upon video creation
      this.instructorService.createVideo(newVideo).subscribe(
        (response) => {
          console.log(response);
          this.newVideo=response;
          this.newVideoId=this.newVideo.id;
          console.log(this.newVideoId);
        
          // Pass the generated video ID back to the parent component
          this.dialogRef.close(this.newVideoId);
          this.openSuccessSnackbar("Video uploaded successfully!");
          this.closeDialog();
        },
        (error) => {
          console.error('Error creating video:', error);
          // Handle error if needed
          this.openCenteredSnackbar('Error creating video!');
        }
      );
    }
  }

  onSubmit2(): void {
    const videoData = this.videoForm.value;
    const file = this.selectedFile;

    this.videoService.createVideo(videoData, file).subscribe(
      (response) => {
        console.log('Video created successfully:', response);
        this.openSuccessSnackbar("Video uploaded successfully!");
        this.closeDialog();
        // Handle success, if needed
      },
      (error) => {
        console.error('Error creating video:', error);
        this.openCenteredSnackbar('Error creating video!');
        // Handle error, if needed
      }
    );
  }
  openSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
      horizontalPosition: 'center',
      verticalPosition :'top', // Position the snackbar horizontally at the center
      panelClass: ['custom-snackbar'], // Add a custom CSS class for styling
    });
  }
  openCenteredSnackbar(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Adjust the duration as needed
    config.verticalPosition = 'center' as MatSnackBarVerticalPosition;
  
    this.snackBar.open(message, 'Close', config);
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
