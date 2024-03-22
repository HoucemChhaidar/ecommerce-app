import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  constructor(public authServices: AuthService) { }

  toggleDropdown() {
    this.dropdownMenu.nativeElement.classList.toggle('hidden');
  }

  logout() {
    this.authServices.logout();
  }
}
