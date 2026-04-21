import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userName: string = 'Guest';

  constructor(private router: Router) {}

  // This runs automatically when the Home page loads
  ngOnInit() {
    const storedUser = localStorage.getItem('registeredUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      this.userName = parsedUser.firstname; // Get their first name
    }
  }

  logout() {
    // Send them back to the login page
    this.router.navigate(['/login']);
  }
}