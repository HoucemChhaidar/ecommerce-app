import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Models/User/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public async getUserByEmailAndPassword(
    email: string,
    password: string
  ) {
    let user: User = User.Empty();
    try {
      const response = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
      if (response.ok) {
        const userData = await response.json();
        // Assuming userData is an array of users matching the email and password
        if (userData.length > 0) {
          user = User.fromJson(userData[0]); // Assuming you only expect one user to match
        }
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    return user;
  }
}
