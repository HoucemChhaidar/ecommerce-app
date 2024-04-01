import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: 'admin/create', component: CreateComponent },
	{ path: 'admin/edit/:id', component: EditComponent },
	{ path: '', component: HomeComponent },
	{ path: '**', component: AppComponent }
];
