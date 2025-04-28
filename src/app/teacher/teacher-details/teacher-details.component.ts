import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [ MaterialModule, NgIf ],
  providers: [ TeacherService, AuthService ],
  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.css'
})
export class TeacherDetailsComponent implements OnInit {
	teacher!: Teacher;
	id!: string;

	constructor(
		private teacherService: TeacherService,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.teacher = {};
	}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.teacherService.getTeacher(this.id).subscribe((data: Teacher) => {
			this.teacher = data;
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
      		this.router.navigate([`**`]);
		});
	}

	isAuthorized() {
		const role: string = this.authService.getRole();
		return role === 'admin' || role === 'headmaster' || role === 'teacher';
	}

	isAuthorizedToUpdate() {
		const role: string = this.authService.getRole();
		return role === 'admin' || role === 'headmaster' || role === 'teacher';
	}

	isAuthorizedToDelete() {
		const role: string = this.authService.getRole();
		return role === 'admin';
	}

	isAuthorizedToReadSchools() {
		const role: string = this.authService.getRole();
		return role === 'admin' || role === 'headmaster' || role === 'teacher';
	}

	isAuthorizedToReadMarksRemarksAbsences() {
		const role: string = this.authService.getRole();
		return role === 'admin' || role === 'headmaster' || role === 'teacher';
	}

	updateTeacher() {
		this.router.navigate([`./update`], { relativeTo: this.activatedRoute });
	}

	deleteTeacher() {
		this.teacherService.deleteTeacher(this.id).subscribe();
		this.router.navigate([`teachers`]);
	}

	getSchools() {
		this.router.navigate([`./schools`], { relativeTo: this.activatedRoute });
	}

	getSubjects() {
		this.router.navigate([`./subjects`], { relativeTo: this.activatedRoute });
	}

	getMarks() {
		this.router.navigate([`./marks`], { relativeTo: this.activatedRoute });
	}

	getRemarks() {
		this.router.navigate([`./remarks`], { relativeTo: this.activatedRoute });
	}

	getAbsences() {
		this.router.navigate([`./absences`], { relativeTo: this.activatedRoute });
	}
}
