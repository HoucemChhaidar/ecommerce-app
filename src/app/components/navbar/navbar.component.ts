import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  

    toggleDropdown() {
        var dropdownMenu = document.getElementById("dropdown-menu");
        dropdownMenu?.classList.toggle("hidden");
    }


}
