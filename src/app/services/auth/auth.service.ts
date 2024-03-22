import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated: boolean;
  localStorage?: Storage;
  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private fbAuth: AngularFireAuth, private firestore: AngularFirestore,) {
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
    this.router.navigate(['/login']);
  }

  public async login(email: string, password: string) {
    const user = await this.fbAuth.signInWithEmailAndPassword(email, password);
    if (user) {
      this.authenticated = true;
      this.localStorage!.setItem('user', JSON.stringify(user.user));
      this.localStorage!.setItem('authenticated', `${this.authenticated}`);
      this.router.navigate(['/']);
    } else {
      this.authenticated = false;
    }
  }

  public async register(username: string, email: string, password: string) {
    const user = await this.fbAuth.createUserWithEmailAndPassword(email, password);
    if (user) {
      user.user?.updateProfile({
        displayName: username,
      });
      this.authenticated = true;
      this.localStorage!.setItem('user', JSON.stringify(user.user));
      this.localStorage!.setItem('authenticated', `${this.authenticated}`);
      await this.firestore.collection('users').doc(user.user?.uid).set({
        username: username,
        email: email,
        password: password,
        isAdmin: false,
        image: '',
      }).then(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.authenticated = false;
    }
    return user;  // Return the user object to the caller.
  }
}
