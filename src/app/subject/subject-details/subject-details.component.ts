import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../models/subject';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-subject-details',
  standalone: true,
  imports: [ MaterialModule, NgIf ],
  providers: [ SubjectService, AuthService ],
  templateUrl: './subject-details.component.html',
  styleUrl: './subject-details.component.css'
})
export class SubjectDetailsComponent implements OnInit {
	id!: string;
	subject!: Subject;

	constructor(
		private subjectService: SubjectService,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.subject = {};
	}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		console.log(this.id);
		this.subjectService.getSubject(this.id).subscribe((data: Subject) => {
			this.subject = data;
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
			this.router.navigate([`schools`]);
		});
	}

	isAuthorizedToModify() {
		const role: string = this.authService.getRole();
		return role === 'admin' || role === 'headmaster';
	}

	isAuthorizedToAddMarkRemarkAbsence() {
		const role: string = this.authService.getRole();
		return role === 'admin' || role === 'headmaster' || role === 'teacher';	
	}

	updateSubject() {
		this.router.navigate([`./update`], { relativeTo: this.activatedRoute });
	}
	
	deleteSubject() {
		this.subjectService.deleteSubject(this.id).subscribe();
		this.router.navigate([`schools`]);
	}

	createMark() {
		this.router.navigate([`./createMark`], { relativeTo: this.activatedRoute });
	}

	getMarks() {
		this.router.navigate([`./marks`], { relativeTo: this.activatedRoute });
	}

	createRemark() {
		this.router.navigate([`./createRemark`], { relativeTo: this.activatedRoute });
	}

	getRemarks() {
		this.router.navigate([`./remarks`], { relativeTo: this.activatedRoute });
	}

	createAbsence() {
		this.router.navigate([`./createAbsence`], { relativeTo: this.activatedRoute });
	}

	getAbsences() {
		this.router.navigate([`./absences`], { relativeTo: this.activatedRoute });
	}

	hasGrade(): boolean {
		const gradeId: string = this.subject.schoolClass?.id || '';
		return gradeId !== '';
	}

	getGrade() {
		if(this.hasGrade()) {
			const gradeId: string = this.subject.schoolClass?.id || '';
			this.router.navigate([`grades/${gradeId}`]);
		}
	}

	hasTeacher(): boolean {
		const teacherId: string = this.subject.teacher?.id || '';
		return teacherId !== '';
	}

	getTeacher() {
		if(this.hasTeacher()) {
			const teacherId: string = this.subject.teacher?.id || '';
			this.router.navigate([`teachers/${teacherId}`]);
		}
	}
}
