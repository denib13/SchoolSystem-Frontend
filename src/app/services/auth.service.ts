import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../models/authRequest';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string;
  private error = '';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) { 
    this.authUrl = 'http://localhost:8080/api/auth/login';
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout() {
    this.clearToken();
    this.router.navigate(['auth/login']);
  }

  public login(request: AuthRequest) {
    return this.http.post<any>(this.authUrl, request);
      // .subscribe({
      //   next: (res) => {
      //     this.setToken(res.token);
      //     this.router.navigate(['']);
      //   },
      //   error: () => {
      //     this.error = 'Invalid credentials';
      //   }
      // });
  }
}
