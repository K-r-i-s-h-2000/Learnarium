import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  loggedUser: any;
  title: any;
  menuItems = [
    {label: 'Home',icon: 'fa-home', route:'/Home'},
    {label: 'Courses', icon: 'fa-book', route:'/Course'},
    {label: 'AboutUs', icon:'fa-about-us', route:'/AboutUs'}
  ];
  activeMenuItem: string | null = null;
  constructor(private router: Router){
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
  gotoHome(){
    console.log("Home button is clicked.");
    this.router.navigate(['/Home']);
  }
  gotoCourse(){
    this.router.navigate(['/Course']);
  }
  private setActiveMenuItem(url: string): void {
    this.activeMenuItem = this.menuItems.find(item => url.startsWith(item.route))?.label || null;
  }
  gotoAboutus() {
    this.router.navigate(['/AboutUs'])
  }
  

toggleMenu() {
  console.log("Button is clicked!");
  this.isMenuOpen = !this.isMenuOpen;
}


}
