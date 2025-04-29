import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ MaterialModule, NgFor, ReactiveFormsModule, NgIf ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
	registerForm: FormGroup = this.formBuilder.group({
		name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
		middleName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
		surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
		nationalIdNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
		username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
		password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(32)]],
		email: ['', [Validators.required, Validators.email]],
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
