import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: AppComponent }
];
