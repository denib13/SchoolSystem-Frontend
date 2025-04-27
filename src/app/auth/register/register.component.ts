import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ MaterialModule, NgFor, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
	registerForm: FormGroup = this.formBuilder.group({
		name: ['', Validators.required],
		middleName: ['', Validators.required],
		surname: ['', Validators.required],
		nationalIdNumber: ['', Validators.required],
		username: ['', Validators.required],
		password: ['', Validators.required],
		email: ['', Validators.required],
		type: ['', Validators.required]
	});

	roles: string[] = ['admin', 'student', 'teacher', 'parent', 'headmaster'];

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder, 
		private router: Router
	) {}

	register() {
		console.log(this.registerForm.value);
		this.authService.register(this.registerForm.value).subscribe((data) => {
			console.log(data);
			this.authService.setToken(data.token);
      		this.authService.setUser(data.user);
			this.authService.setRole(data.user);
      		this.router.navigate(['/']);
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
		});
	}
}
