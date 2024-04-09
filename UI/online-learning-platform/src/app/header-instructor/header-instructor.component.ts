import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';



@Component({
  selector: 'app-header-instructor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-instructor.component.html',
  styleUrl: './header-instructor.component.scss'
})
export class HeaderInstructorComponent {
  _dialog:MatDialog;
  loggedUser: any;
  title: any;
  menuItems = [
    {label: 'Courses',icon: 'fa-home', route:'/Courses'},
    {label: 'EnrolledStudents', icon: 'fa-book', route:'/EnrolledStudents'},
    {label: 'Profile', icon:'fa-about-us', route:'/Profile'}
  ];
  activeMenuItem: string | null = null;
  constructor(private router: Router,public dialog: MatDialog){
    this._dialog=dialog;
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Set the activeMenuItem based on the current route
      this.setActiveMenuItem(event.url);
    });
  }
  isHeaderSticky = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check the scroll position and set isHeaderSticky accordingly
    this.isHeaderSticky = window.pageYOffset > 0;
  }
  ngOnInit():void{
    this.setActiveMenuItem(this.router.url);
  }
  goToMyRevenue() {
    console.log("My Revenue button is clicked!");
    this.router.navigate(['/MyRevenue']);
  }
  gotoProfile() {
    console.log("Profile button is clicked!");
    this.router.navigate(['/Profile']);

  }
    // Set the activeMenuItem based on the current route
  gotoMyCourses() {
    console.log("My courses button is clicked!");
    this.router.navigate(['/Instructor']);
  }
  private setActiveMenuItem(url: string): void {
    this.activeMenuItem = this.menuItems.find(item => url.startsWith(item.route))?.label || null;
  }


    Logout() {
      localStorage.removeItem('token');
      this.router.navigate(['Login']);
  
    }
}
