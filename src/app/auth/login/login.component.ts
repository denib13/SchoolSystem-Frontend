import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgIf ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((data) => {
      console.log(data);
      this.authService.setToken(data.token);
      this.authService.setUser(data.user);
      this.router.navigate(['/']);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.errors);
    });
  }
}
