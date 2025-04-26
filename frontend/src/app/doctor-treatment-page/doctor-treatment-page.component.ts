import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-treatment-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-treatment-page.component.html',
  styleUrl: './doctor-treatment-page.component.scss'
})
export class DoctorTreatmentPageComponent {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);

  name: string = '';
  description: string = '';
  conditionId: number | null = null;

  conditions: any[] = [];

  constructor() {
    this.loadDoctorConditions();
  }

  loadDoctorConditions() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/doctor/conditions/').subscribe({
      next: (data) => {
        this.conditions = data;
      },
      error: (err) => {
        console.error('Failed to load conditions', err);
        alert('Failed to load your patients.');
      }
    });
  }

  addTreatment() {
    if (!this.conditionId) {
      alert('Please select a patient condition.');
      return;
    }

    const body = {
      name: this.name,
      description: this.description,
      prescribed_at: new Date().toISOString().slice(0, 10),
      condition: this.conditionId
    };

    this.http.post('http://127.0.0.1:8000/api/treatments/', body).subscribe({
      next: () => {
        alert('Treatment successfully assigned!');
        this.name = '';
        this.description = '';
        this.conditionId = null;
        this.loadDoctorConditions();
      },
      error: (err) => {
        console.error('Failed to add treatment', err);
        alert('Failed to assign treatment.');
      }
    });
  }

  isDoctor(): boolean {
    return this.authService.getStoredRole() === 'doctor';
  }
}
