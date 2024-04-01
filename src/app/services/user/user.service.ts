import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Models/User/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) { }

	public async getUserByEmailAndPassword(email: string, password: string) {
		let user: User = User.Empty();

		try {
			const response = await this.http.get(`http://localhost:3000/users?email=${email}&password=${password}`);
			user = User.fromJson(response);
		} catch (error) {
			console.error('Error fetching user data:', error);
		}

		return user;
	}
}
