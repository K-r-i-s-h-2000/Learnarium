// new-video-registration.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Video } from '../course.model';
import { InstructorService } from '../instructor.service';
import { CommonModule } from '@angular/common';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-new-video-registration',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './new-video-registration.component.html',
  styleUrls: ['./new-video-registration.component.scss'],
})
export class NewVideoRegistrationComponent implements OnInit {
  videoForm: FormGroup;
  newVideo: any;
  newVideoId:number;
  selectedFile: File;
  constructor(
    public dialogRef: MatDialogRef<NewVideoRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private instructorService: InstructorService,
    private dialog: MatDialog,
    private videoService:VideoService
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

  onSubmit() {
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
        },
        (error) => {
          console.error('Error creating video:', error);
          // Handle error if needed
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
    this.dialog.closeAll(); 
  }
  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  // onSubmit1(): void {
  //   const videoData = this.videoForm.value;
  //   const file = this.selectedFile;

  //   this.videoService.createVideo(videoData, file).subscribe(
  //     (response) => {
  //       console.log('Video created successfully:', response);
  //       // Handle success, if needed
  //     },
  //     (error) => {
  //       console.error('Error creating video:', error);
  //       // Handle error, if needed
  //     }
  //   );
  // }
}
