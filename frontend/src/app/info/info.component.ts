import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/user/auth.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  userData: any = null;
  isDoctor: boolean = false;
  patientTreatments: any[] = [];
  doctorTreatments: any[] = [];

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      console.error('User is not logged in!');
      return;
    }
    this.loadUserData();
  }

  loadUserData() {
    this.http.get('http://127.0.0.1:8000/api/me/').subscribe({
      next: (data) => {
        this.userData = data;
        this.isDoctor = false;
        this.loadPatientTreatments();
      },
      error: (err) => {
        if (err.status === 403) {
          this.http.get('http://127.0.0.1:8000/api/doctor/profile/').subscribe({
            next: (data) => {
              this.userData = data;
              this.isDoctor = true;
              this.loadDoctorTreatments();
            },
            error: (error) => {
              console.error('Failed to load doctor data', error);
            }
          });
        } else {
          console.error('Failed to load user data', err);
        }
      }
    });
  }

  loadPatientTreatments() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/me/treatments/').subscribe({
      next: (data) => {
        this.patientTreatments = data;
      },
      error: (error) => {
        console.error('Failed to load patient treatments', error);
      }
    });
  }

  loadDoctorTreatments() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/doctor/treatments/').subscribe({
      next: (data) => {
        this.doctorTreatments = data;
      },
      error: (error) => {
        console.error('Failed to load doctor treatments', error);
      }
    });
  }

  deleteTreatment(id: number) {
    if (!confirm('Are you sure you want to delete this treatment?')) {
      return;
    }

    this.http.delete(`http://127.0.0.1:8000/api/treatments/${id}/`).subscribe({
      next: () => {
        alert('Treatment deleted successfully.');
        this.loadDoctorTreatments();
      },
      error: (error) => {
        console.error('Failed to delete treatment', error);
        alert('Failed to delete treatment.');
      }
    });
  }
}
