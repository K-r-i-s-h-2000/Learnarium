import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NewVideoRegistrationComponent } from './new-video-registration.component';
import { InstructorService } from '../instructor.service';
import { VideoService } from '../video.service';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('NewVideoRegistrationComponent', () => {
  let component: NewVideoRegistrationComponent;
  let fixture: ComponentFixture<NewVideoRegistrationComponent>;
  let mockDialogRef: any;
  let mockDialogData: any;
  let mockInstructorService: any;
  let mockVideoService: any;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj(['close']);
    mockDialogData = {};
    mockInstructorService = jasmine.createSpyObj('InstructorService', ['createVideo']);
    mockVideoService = jasmine.createSpyObj('VideoService', ['createVideo']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        NewVideoRegistrationComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        MatDialogModule
      ],
      providers: [
        FormBuilder,
        { provide: InstructorService, useValue: mockInstructorService },
        { provide: VideoService, useValue: mockVideoService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVideoRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit method on form submission', fakeAsync(() => {
    spyOn(component, 'onSubmit').and.callThrough();
    const form = fixture.debugElement.query(By.css('form')).nativeElement;

    component.videoForm.setValue({
      title: 'Test Title',
      link: 'Test Link'
    });

    form.dispatchEvent(new Event('submit'));
    tick();

    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('should call onCancel method on button click', () => {
    spyOn(component, 'onCancel');
    const button = fixture.debugElement.nativeElement.querySelector('button[type="button"]');
    button.click();
    expect(component.onCancel).toHaveBeenCalled();
  });

  it('should call onFileSelected method', () => {
    spyOn(component, 'onFileSelected');
    const event = { target: { files: [new File([''], 'sample.jpg', { type: 'image/jpg' })] } };
    component.onFileSelected(event);
    expect(component.onFileSelected).toHaveBeenCalledWith(event);
  });

  it('should close dialog when onCancel method is called', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should submit form and close dialog when onSubmit method is called and form is valid', fakeAsync(() => {
    const mockResponse = { id: 1 };
    mockInstructorService.createVideo.and.returnValue(of(mockResponse));

    component.videoForm.setValue({
      title: 'Test Title',
      link: 'Test Link'
    });

    component.onSubmit();
    tick();

    expect(mockInstructorService.createVideo).toHaveBeenCalledWith({
      title: 'Test Title',
      link: 'Test Link'
    });
    expect(mockDialogRef.close).toHaveBeenCalledWith(mockResponse.id);
  }));

  it('should not submit form and close dialog when onSubmit method is called and form is invalid', fakeAsync(() => {
    spyOn(component.videoForm, 'get').and.callFake((controlName: string) => {
        return {
            valid: false // Mocking the valid property of the form control
        } as any; // Type assertion to override inferred type
    });

    component.onSubmit();
    tick();

    expect(mockInstructorService.createVideo).not.toHaveBeenCalled();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
}));




});

