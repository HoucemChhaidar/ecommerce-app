import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signInForm: FormGroup = new FormGroup({});
  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');

  constructor(private authServices: AuthService, router: Router) { 
    if (authServices.authenticated) {
      router.navigate(['/']);
    }
  }

  login() {
    if (this.email.value != '' && this.password.value != '') {
      this.authServices.login(this.email.value, this.password.value);
    }
  }
}
