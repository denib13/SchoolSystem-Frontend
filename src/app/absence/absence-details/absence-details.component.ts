import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { AbsenceService } from '../../services/absence.service';
import { Absence } from '../../models/absence';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-absence-details',
  standalone: true,
  imports: [ MaterialModule, NgIf ],
  providers: [ AbsenceService, AuthService ],
  templateUrl: './absence-details.component.html',
  styleUrl: './absence-details.component.css'
})
export class AbsenceDetailsComponent implements OnInit {
	id!: string;
	absence!: Absence;

	constructor(
		private absenceService: AbsenceService,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private location: Location
	) {
		this.absence = {};
	}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.absenceService.getAbsence(this.id).subscribe((data: Absence) => {
			this.absence = data;
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
			this.location.back();
		});
	}

	isAuthorized() {
		const role: string = this.authService.getRole();
		return role === 'teacher' || role === 'admin';
	}

	deleteAbsence() {
		this.absenceService.deleteAbsence(this.id).subscribe();
		this.location.back();
	}
}
