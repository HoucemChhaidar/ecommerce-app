import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { User } from '../../Models/User/user';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated: boolean;
  localStorage?: Storage;
  constructor(@Inject(DOCUMENT) private document: Document, private userServices: UserService, private router: Router) {
    this.localStorage = this.document.defaultView?.localStorage;
    if (this.localStorage?.getItem('user') === null) {
      this.localStorage?.setItem('user', JSON.stringify({}));
    }
    if (this.localStorage) {
      this.authenticated =
        this.localStorage.getItem('authenticated') === 'true';
    } else {
      this.authenticated = false;
    }
  }

  logout() {
    this.authenticated = false;
    this.localStorage!.removeItem('user');
    this.localStorage!.setItem('authenticated', `${this.authenticated}`);
  }

  public async login(email: string, password: string) {
    let user: User = await this.userServices.getUserByEmailAndPassword(
      email,
      password
    );
    console.log('user: ', user);
    if (user) {
      this.authenticated = true;
      this.localStorage!.setItem('authenticated', `${this.authenticated}`);
      this.localStorage!.setItem('user', User.toJson(user));
      this.router.navigate(['/'])
      return true;
    }
    return false;
  }

  // public register(name:string, email: string, password: string) {
  //   this.userServices.addUser(
  //     new User(0, name, email, password)
  //   );
  //   this.login(email, password);
  // }
}
