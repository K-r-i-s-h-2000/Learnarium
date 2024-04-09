import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';



@Component({
  selector: 'app-header-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-landing.component.html',
  styleUrl: './header-landing.component.scss'
})
export class HeaderLandingComponent {
  _dialog:MatDialog;
  loggedUser: any;
  title: any;
  menuItems = [
    {label: 'Cart',icon: 'fa-home', route:'/Cart'},
    {label: 'Category', icon: 'fa-book', route:'/Category'},
    {label: '', icon:'fa-about-us', route:'/AboutUs'}
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
    this.activeMenuItem = 'Category';

    // Subscribe to router events to update activeMenuItem based on navigation
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Set the activeMenuItem based on the current route
      this.setActiveMenuItem(event.url);
    });
  }
  gotoEnroll() {
    console.log("Enrolled Courses button is clicked!");
    this.router.navigate(['/EnrolledCourses']);
  }
  gotoProfile() {
    console.log("Profile button is clicked!");
    this.router.navigate(['/Profile']);

  }
    // Set the activeMenuItem based on the current route
  gotoCategories() {
    console.log("Category button is clicked!");
    this.router.navigate(['/LandingPage']);
  }
  private setActiveMenuItem(url: string): void {
    if (!url) {
        this.activeMenuItem = null;
        return;
    }

    this.activeMenuItem = this.menuItems.find(item => item.route && url.startsWith(item.route))?.label || null;
}

    Logout() {
      localStorage.removeItem('token');
      this.router.navigate(['Login']);
  
    }
}
