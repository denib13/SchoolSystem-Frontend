import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MaterialModule, CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
	constructor(public authService: AuthService, private router: Router) {}

	get username(): string {
	  return this.authService.getCurrentUser()?.name || 'Guest';
	}
  
	get role(): string {
	  return this.authService.getRole();
	}

	goToProfile() {
		this.router.navigate([`profile`]);
	}
}
