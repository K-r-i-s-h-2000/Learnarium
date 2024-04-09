import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstructorComponent } from './instructor.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

describe('InstructorComponent', () => {
  let component: InstructorComponent;
  let fixture: ComponentFixture<InstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule], // Import HttpClientModule here
      // Remove InstructorComponent from declarations array
      declarations: [],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
