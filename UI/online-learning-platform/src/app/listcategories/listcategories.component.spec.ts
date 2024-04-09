import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListcategoriesComponent } from './listcategories.component';

describe('ListcategoriesComponent', () => {
  let component: ListcategoriesComponent;
  let fixture: ComponentFixture<ListcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [] // Remove ListcategoriesComponent from declarations array
    }).compileComponents();
    
    fixture = TestBed.createComponent(ListcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
