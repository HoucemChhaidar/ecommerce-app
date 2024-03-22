import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

// import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup = new FormGroup({});
  username: FormControl = new FormControl('');
  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');
  confirmPassword: FormControl = new FormControl('');

  constructor(private router: Router, private authServices: AuthService) {
    this.signupForm = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  async register() {
    if (this.password.value !== this.confirmPassword.value) {
      alert('Passwords do not match.');
      return;
    }
    this.signupForm.markAllAsTouched();
    if (this.signupForm.invalid) {
      return;
    }
    await this.authServices.register(this.username.value, this.email.value, this.password.value);
    this.signupForm.reset(); // Reset the form after submitting.
    this.username.setValue('');
    this.email.setValue('');
    this.password.setValue('');
    this.router.navigate(['/']);
  }
}
