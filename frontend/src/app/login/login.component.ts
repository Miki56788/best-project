import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/user/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        console.log('Login successful');

        if (this.username.toLowerCase().includes('popov') || this.username.toLowerCase().includes('ivanov')) {
          this.authService.setRole('doctor');
        } else {
          this.authService.setRole('patient');
        }

        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Invalid username or password');
      }
    });
  }
}
