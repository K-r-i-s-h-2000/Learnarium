import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoUploadComponent } from './video-upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule if not already imported
import { InstructorService } from '../instructor.service';
import { VideoService } from '../video.service';
import { of } from 'rxjs';
import { Video } from '../course.model';

describe('VideoUploadComponent', () => {
  let component: VideoUploadComponent;
  let fixture: ComponentFixture<VideoUploadComponent>;
  let mockDialogRef: Partial<MatDialogRef<VideoUploadComponent>>;
  let mockSnackBar: Partial<MatSnackBar>;
  let mockInstructorService: jasmine.SpyObj<InstructorService>;
  let mockVideoService: jasmine.SpyObj<VideoService>;

  beforeEach(async () => {
    mockDialogRef = {
      close: jasmine.createSpy('close')
    };

    mockSnackBar = {
      open: jasmine.createSpy('open')
    };

    mockInstructorService = jasmine.createSpyObj('InstructorService', ['createVideo']);
    mockVideoService = jasmine.createSpyObj('VideoService', ['createVideo']);
    mockVideoService.createVideo.and.returnValue(of({ title: 'Example Title', link: 'example-link.mp4' } as Video));

    await TestBed.configureTestingModule({
      imports: [VideoUploadComponent, ReactiveFormsModule, BrowserAnimationsModule, MatSnackBarModule], // Add necessary imports here
      declarations: [], // Declare the VideoUploadComponent here
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: InstructorService, useValue: mockInstructorService },
        { provide: VideoService, useValue: mockVideoService },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoUploadComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.videoForm).toBeDefined();
    expect(component.videoForm.get('title')).toBeDefined();
    expect(component.videoForm.get('link')).toBeDefined();
  });

  it('should handle cancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should handle file selection', () => {
    const file = new File([''], 'filename.mp4', { type: 'video/mp4' });
    const event = { target: { files: [file] } };
    component.onFileSelected(event as any);
    expect(component.selectedFile).toBe(file);
    expect(component.uploadFileOption).toBeFalse();
  });

  it('should handle form submission with upload file option', () => {
    spyOn(component, 'onSubmit1');
    spyOn(component, 'onSubmit2');
    component.uploadFileOption = true;
    
    component.onSubmit();
    expect(component.onSubmit1).toHaveBeenCalled();
    expect(component.onSubmit2).not.toHaveBeenCalled();
  });

  it('should handle form submission without upload file option', () => {
    spyOn(component, 'onSubmit1');
    spyOn(component, 'onSubmit2');
    component.uploadFileOption = false;
    component.onSubmit();
    expect(component.onSubmit1).not.toHaveBeenCalled();
    expect(component.onSubmit2).toHaveBeenCalled();
  });

  it('should handle form submission with upload file option when form is valid', () => {
    component.uploadFileOption = true;
    component.videoForm.setValue({ title: 'Test Title', link: 'Test Link' });
    mockInstructorService.createVideo.and.returnValue(of({ id: 1 }));
    component.onSubmit1();
    expect(mockInstructorService.createVideo).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(component.openSuccessSnackbar).toHaveBeenCalled();
    expect(component.closeDialog).toHaveBeenCalled();
  });

  it('should handle form submission with upload file option when form is invalid', () => {
    component.uploadFileOption = true;
    component.videoForm.setValue({ title: '', link: '' });
    component.onSubmit1();
    expect(mockInstructorService.createVideo).not.toHaveBeenCalled();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
    expect(component.openCenteredSnackbar).toHaveBeenCalled();
    expect(component.closeDialog).not.toHaveBeenCalled();
  });

  it('should handle form submission without upload file option', () => {
    component.uploadFileOption = false;
    const file = new File([''], 'filename.mp4', { type: 'video/mp4' });
    component.selectedFile = file;
    component.videoForm.setValue({ title: 'Test Title', link: 'Test Link' });
    mockInstructorService = jasmine.createSpyObj('InstructorService', ['createVideo']);
    const mockVideo: Video = { title: 'Test Title', link: 'Test Link' };
    mockInstructorService.createVideo.and.returnValue(of(mockVideo));
    component.onSubmit2();
    expect(mockVideoService.createVideo).toHaveBeenCalled();
    expect(component.openSuccessSnackbar).toHaveBeenCalled();
    expect(component.closeDialog).toHaveBeenCalled();
  });

  it('should handle form submission without upload file option when form is invalid', () => {
    component.uploadFileOption = false;
    component.videoForm.setValue({ title: '', link: 'Test Link' });
    component.onSubmit2();
    expect(mockVideoService.createVideo).not.toHaveBeenCalled();
    expect(component.openCenteredSnackbar).toHaveBeenCalled();
    expect(component.closeDialog).not.toHaveBeenCalled();
  });

  it('should open a success snackbar', () => {
    component.openSuccessSnackbar('Test Message');
    expect(mockSnackBar.open).toHaveBeenCalledWith('Test Message', 'Close', jasmine.any(Object));
  });

  it('should open a centered snackbar', () => {
    component.openCenteredSnackbar('Test Message');
    expect(mockSnackBar.open).toHaveBeenCalledWith('Test Message', 'Close', jasmine.any(Object));
  });

  it('should close the dialog', () => {
    component.closeDialog();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
