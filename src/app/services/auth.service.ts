import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../models/authRequest';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string;
  private error = '';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) { 
    this.authUrl = 'http://localhost:8080/api/auth/';
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): any {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  clearUser() {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout() {
    this.clearToken();
    this.clearUser();
    this.router.navigate(['auth/login']);
  }

  public login(request: AuthRequest) {
    return this.http.post<any>(this.authUrl + `login`, request);
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

  public register(request: any) {
    return this.http.post<any>(this.authUrl + `register`, request);
  }
}
