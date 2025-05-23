import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { GradeService } from '../../services/grade.service';
import { Grade } from '../../models/grade';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-grade-details',
  standalone: true,
  imports: [ MaterialModule, NgIf ],
  providers: [ GradeService, AuthService ],
  templateUrl: './grade-details.component.html',
  styleUrl: './grade-details.component.css'
})
export class GradeDetailsComponent implements OnInit {
	id!: string;
	grade!: Grade;

	constructor(
		private gradeService: GradeService,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.grade = {};
	}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.gradeService.getGrade(this.id).subscribe((data: Grade) => {
			this.grade = data;
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
			this.router.navigate([`schools`]);
		});
	}

	isAuthorized() {
		const role: string = this.authService.getRole();
		return role === 'headmaster' || role === 'admin';
	}

	updateGrade() {
		this.router.navigate([`./update`], { relativeTo: this.activatedRoute });
	}

	deleteGrade() {
		this.gradeService.deleteGrade(this.id).subscribe();
		this.router.navigate(['schools']);
	}

	addSubject() {
		this.router.navigate([`./createSubject`], { relativeTo: this.activatedRoute });
	}

	getSubjects() {
		this.router.navigate([`./subjects`], { relativeTo: this.activatedRoute });
	}

	addStudents() {
		this.router.navigate([`./addStudents`], { relativeTo: this.activatedRoute });
	}

	getStudents() {
		this.router.navigate([`./students`], { relativeTo: this.activatedRoute });
	}

	hasSchool(): boolean {
		const schoolId: string = this.grade.school?.id || '';
		return schoolId !== '';
	}

	getSchool() {
		if(this.hasSchool()) {
			const schoolId: string = this.grade.school?.id || '';
			this.router.navigate([`schools/${schoolId}`]);
		}
	}
}
