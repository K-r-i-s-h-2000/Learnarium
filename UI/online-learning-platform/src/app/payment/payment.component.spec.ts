import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let mockDialog: Partial<MatDialog>;
  let mockSnackBar: Partial<MatSnackBar>;
  let mockRouter: Partial<Router>;
  let mockPaymentService: Partial<PaymentService>;

  beforeEach(async () => {
    mockDialog = {
      closeAll: () => {} // Mock implementation of closeAll method
    };

    mockSnackBar = {
      open: (message: string, action?: string, config?: MatSnackBarConfig<any>): MatSnackBarRef<TextOnlySnackBar> => {
        return {} as MatSnackBarRef<TextOnlySnackBar>; // Mock implementation of open method
      }
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate') // Mock the navigate method
    };

    mockPaymentService = {
      createEnrollment: () => of({ courseId: 123 }) // Mock implementation of createEnrollment method
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [PaymentComponent, ReactiveFormsModule, CommonModule, HttpClientModule],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter },
        { provide: PaymentService, useValue: mockPaymentService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with proper controls', () => {
    expect(component.reactiveform.get('cardNumber')).not.toBeNull();
    expect(component.reactiveform.get('expirationDate')).not.toBeNull();
    expect(component.reactiveform.get('cvv')).not.toBeNull();
  });

  it('should call paymentSubmit method when form is submitted with valid data', fakeAsync(() => {
    spyOn(component, 'paymentSubmit');

    // Simulate form submission with valid data
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    component.reactiveform.patchValue({
      cardNumber: '1234567890123456',
      expirationDate: '12/23',
      cvv: '123'
    });
    form.dispatchEvent(new Event('submit'));
    tick();

    expect(component.paymentSubmit).toHaveBeenCalled();
  }));

  it('should not call paymentSubmit method when form is submitted with invalid data', fakeAsync(() => {
    spyOn(component, 'paymentSubmit');

    // Simulate form submission with invalid data
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    tick();

    expect(component.paymentSubmit).not.toHaveBeenCalled();
  }));

  it('should close the dialog when closeForm method is called', () => {
    spyOn(mockDialog, 'closeAll');
    component.closeForm();
    expect(mockDialog.closeAll).toHaveBeenCalled();
  });

  it('should open success snackbar when openSuccessSnackbar method is called', () => {
    spyOn(mockSnackBar, 'open');
    component.openSuccessSnackbar('Test Message');
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Test Message',
      'Close',
      jasmine.objectContaining({
        duration: 3000,
        verticalPosition: 'center',
        panelClass: ['custom-snackbar']
      })
    );
  });

  it('should call paymentService.createEnrollment and navigate to ToCoursePaid on paymentSubmit', () => {
    const mockPaymentService = TestBed.inject(PaymentService);
    const mockRouter = TestBed.inject(Router);
  
    spyOn(mockPaymentService, 'createEnrollment').and.callFake((courseData) => {
      // Check if courseData contains correct values
      expect(courseData.studentId).toEqual(123); // Ensure studentId is correct
      expect(courseData.courseId).toEqual(456); // Ensure courseId is correct
  
      // Return a mock observable
      return of({ courseId: 123 });
    });
  
    spyOn(mockRouter, 'navigate');
  
    // Set values for studentId and courseId in localStorage and parse them as numbers
    localStorage.setItem('CourseId', '456');
    localStorage.setItem('studentId', '123');
  
    // Patch form values
    component.reactiveform.patchValue({
      cardNumber: '1234567890123456',
      expirationDate: '12/23',
      cvv: '123'
    });
  
    // Trigger paymentSubmit method
    component.paymentSubmit();
  
    // Expectations
    expect(mockPaymentService.createEnrollment).toHaveBeenCalled(); // Ensure createEnrollment is called
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/ToCoursePaid', 123]); // Ensure navigate is called with the correct arguments
  });
  
  
  
});
