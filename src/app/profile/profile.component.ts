import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		const user = this.authService.getCurrentUser();

		if (!user) {
			this.router.navigate(['auth/login']);
			return;
		}

		const role = this.authService.getRole();
		const id = user.id;

		switch (role) {
		case 'student':
			this.router.navigate([`students/${id}`]);
			break;
		case 'parent':
			this.router.navigate([`parents/${id}`]);
			break;
		case 'teacher':
			this.router.navigate([`teachers/${id}`]);
			break;
		case 'headmaster':
			this.router.navigate([`headmasters/${id}`]);
			break;
		default:
			this.router.navigate(['/']);
			break;
		}
	}
}
