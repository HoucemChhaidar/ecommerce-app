import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Add this line for styling
})
export class HomeComponent {
  constructor( authServices: AuthService, router: Router) {
    if (authServices.authenticated == false) {
      router.navigate(['/login']);
    }
  }
}
