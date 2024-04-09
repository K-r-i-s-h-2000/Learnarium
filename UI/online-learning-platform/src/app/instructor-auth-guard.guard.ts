import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class instructorAuthGuardGuard implements CanActivate {
  constructor(private service: LoginService, private router: Router) {}

  canActivate(): boolean {

    const userRole = localStorage.getItem('userRole');

    if (this.service.isLoggedIn()) {
      console.log(userRole);
      if (userRole === 'INSTRUCTOR') {
        return true; // Allow access for customer role
      } else {
        this.router.navigate(['/Login']);
        return false;
      }
    } else {
      this.router.navigate(['/Login']);
      return false;
    }
  }
}
