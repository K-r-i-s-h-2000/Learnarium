import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnrolledCoursesComponent } from './enrolled-courses.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

describe('EnrolledCoursesComponent', () => {
  let component: EnrolledCoursesComponent;
  let fixture: ComponentFixture<EnrolledCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,EnrolledCoursesComponent], // Import HttpClientModule here
      declarations: [] // Declare the component
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrolledCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
