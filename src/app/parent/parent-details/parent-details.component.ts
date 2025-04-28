import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { ParentService } from '../../services/parent.service';
import { Parent } from '../../models/parent';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-parent-details',
  standalone: true,
  imports: [ MaterialModule, NgIf ],
  providers: [ ParentService, AuthService ],
  templateUrl: './parent-details.component.html',
  styleUrl: './parent-details.component.css'
})
export class ParentDetailsComponent implements OnInit {
	parent!: Parent;
	id!: string;

	constructor(
		private parentService: ParentService,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.parent = {};
	}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.parentService.getParent(this.id).subscribe((data: Parent) => {
			this.parent = data;
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
      		this.router.navigate([`**`]);
		});
	}

	isAuthorized() {
		const role: string = this.authService.getRole();
		return role === 'parent' || role === 'admin';
	}

	isAuthorizedToUpdate() {
		const role: string = this.authService.getRole();
		return role === 'parent' || role === 'admin';
	}

	isAuthorizedToDelete() {
		const role: string = this.authService.getRole();
		return role === 'admin';
	}

	updateParent() {
		this.router.navigate([`./update`], { relativeTo: this.activatedRoute });
	}

	deleteParent() {
		this.parentService.deleteParent(this.id).subscribe();
		this.router.navigate([`parents`]);
	}

	getChildren() {
		this.router.navigate([`./children`], { relativeTo: this.activatedRoute });
	}
}
