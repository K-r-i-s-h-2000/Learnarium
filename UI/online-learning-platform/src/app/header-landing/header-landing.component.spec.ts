import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderLandingComponent } from './header-landing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

describe('HeaderLandingComponent', () => {
  let component: HeaderLandingComponent;
  let fixture: ComponentFixture<HeaderLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HeaderLandingComponent,RouterTestingModule, MatDialogModule, CommonModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to EnrolledCourses when gotoEnroll is called', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.gotoEnroll();
    expect(routerSpy).toHaveBeenCalledWith(['/EnrolledCourses']);
  });

  it('should navigate to Profile when gotoProfile is called', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.gotoProfile();
    expect(routerSpy).toHaveBeenCalledWith(['/Profile']);
  });

  it('should navigate to LandingPage when gotoCategories is called', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.gotoCategories();
    expect(routerSpy).toHaveBeenCalledWith(['/LandingPage']);
  });

  it('should remove token from localStorage and navigate to Login when Logout is called', () => {
    const localStorageSpy = spyOn(localStorage, 'removeItem');
    const routerSpy = spyOn(component['router'], 'navigate');
    component.Logout();
    expect(localStorageSpy).toHaveBeenCalledWith('token');
    expect(routerSpy).toHaveBeenCalledWith(['Login']);
  });

  it('should set activeMenuItem correctly on initialization', () => {
    component.ngOnInit();
    expect(component.activeMenuItem).toBe('Category');
  });
});
