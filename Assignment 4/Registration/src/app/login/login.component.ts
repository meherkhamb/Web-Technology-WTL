import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Required for *ngIf to work!
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Data tied to your HTML inputs
  loginData = {
    email: '',
    password: ''
  };

  // Variable to show the error box if authentication fails
  errorMessage: string = '';

  // Inject the Router so we can navigate pages later
  constructor(private router: Router) {}

  onSubmit() {
    // Clear any previous errors when the user clicks Login
    this.errorMessage = '';

    // 1. Get the saved user data from Local Storage (our "database")
    const storedUser = localStorage.getItem('registeredUser');

    // Authentication Check 1: Did they ever register?
    if (!storedUser) {
      this.errorMessage = 'No account found. Please register first!';
      return; // Stop running the code
    }

    // Convert the saved text back into a usable object
    const parsedUser = JSON.parse(storedUser);

    // Authentication Check 2: Does the email match?
    if (this.loginData.email !== parsedUser.email) {
      this.errorMessage = 'No account found with this email. Please register first!';
      return;
    }

    // Authentication Check 3: Does the password match?
    if (this.loginData.password !== parsedUser.password) {
      this.errorMessage = 'Incorrect password. Please try again.';
      return;
    }

    // If it passes all checks, they are Authenticated!
    // Send them directly to the new Home component we just built:
    this.router.navigate(['/home']);
  }
}