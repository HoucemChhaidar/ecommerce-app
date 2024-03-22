import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '**', component: AppComponent }
];
