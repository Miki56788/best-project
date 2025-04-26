import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'access_token';
  private roleKey = 'user_role';
  private apiUrl = 'http://127.0.0.1:8000/api/token/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<void> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      map(response => {
        localStorage.setItem(this.tokenKey, response.access);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  setRole(role: string) {
    localStorage.setItem(this.roleKey, role);
  }

  getStoredRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
