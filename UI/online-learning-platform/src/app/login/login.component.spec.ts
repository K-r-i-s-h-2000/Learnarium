import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let navigateSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [LoginComponent, ReactiveFormsModule, CommonModule, RouterTestingModule, MatDialogModule, MatSnackBarModule, HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    navigateSpy = spyOn(component['router'], 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to LandingPage on successful login as STUDENT', () => {
    const mockData = { role: 'STUDENT' };

    spyOn(component['loginService'], 'submitLoginForm').and.returnValue(of(mockData));

    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledWith(['/LandingPage']);
  });

  it('should navigate to Instructor on successful login as INSTRUCTOR', () => {
    const mockData = { role: 'INSTRUCTOR' };

    spyOn(component['loginService'], 'submitLoginForm').and.returnValue(of(mockData));

    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledWith(['/Instructor']);
  });

  it('should navigate to Course on successful login as ADMIN', () => {
    const mockData = { role: 'ADMIN' };

    spyOn(component['loginService'], 'submitLoginForm').and.returnValue(of(mockData));

    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledWith(['/Course']);
  });

  it('should display snackbar on unsuccessful login', () => {
    spyOn(component['loginService'], 'submitLoginForm').and.returnValue(of(null));

    component.onSubmit();

    expect(component['snackBar'].open).toHaveBeenCalledWith('invalid credentials!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
  });
});
