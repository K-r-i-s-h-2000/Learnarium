import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
gotoSignup() {
  console.log("Signup button is clicked.");
  this.router.navigate(['/Signup']);
}

  constructor(private router: Router){

  }
  gotoLogin() {
    console.log("Login button is clicked.");
      this.router.navigate(['/Login']);
  }
}
