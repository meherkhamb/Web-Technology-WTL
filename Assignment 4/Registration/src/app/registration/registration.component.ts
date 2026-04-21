import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationData = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };
  constructor(private router: Router) {}

  onSubmit() {
    console.log('Registration Submitted!', this.registrationData);
    alert('Registration successful for: ' + this.registrationData.firstname + ' ' + this.registrationData.lastname);
    
    this.router.navigate(['/login']);
  }
}