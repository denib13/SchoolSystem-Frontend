import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [ MaterialModule, NgIf ],
  providers: [ StudentService, AuthService ],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {
	student!: Student;
	id!: string;

	constructor(
		private studentService: StudentService,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.student = {};
	}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.studentService.getStudent(this.id).subscribe((data: Student) => {
			this.student = data;
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
			this.router.navigate([`**`]);
		});
	}

	isAuthorized() {
		const role: string = this.authService.getRole();
		return role === 'admin' || role === 'student' || role === 'headmaster';
	}

	isAuthorizedToUpdate() {
		const role: string = this.authService.getRole();
		return role === 'admin' || role === 'student' || role === 'headmaster';
	}

	isAuthorizedToDelete() {
		const role: string = this.authService.getRole();
		return role === 'admin' || role === 'headmaster';
	}

	isAuthorizedToAddParents() {
		const role: string = this.authService.getRole();
		return role === 'admin' || role === 'headmaster';
	}

	updateStudent() {
		this.router.navigate([`./update`], { relativeTo: this.activatedRoute });
	}

	deleteStudent() {
		this.studentService.deleteStudent(this.id).subscribe();
		this.router.navigate([`students`]);
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

	addParents() {
		this.router.navigate([`./addParents`], { relativeTo: this.activatedRoute });
	}

	getParents() {
		this.router.navigate([`./parents`], { relativeTo: this.activatedRoute });
	}

	hasSchool(): boolean {
		const schoolId: string = this.student.school?.id || '';
		return schoolId !== '';
	}

	getSchool() {
		if(this.hasSchool()) {
			const schoolId: string = this.student.school?.id || '';
			this.router.navigate([`schools/${schoolId}`]);
		}
	}

	hasSchoolClass(): boolean {
		const schoolClassId: string = this.student.schoolClass?.id || '';
		return schoolClassId !== '';
	}

	getSchoolClass() {
		if(this.hasSchoolClass()) {
			const schoolClassId: string = this.student.schoolClass?.id || '';
			this.router.navigate([`grades/${schoolClassId}`]);
		}
	}

	getStatistics() {
		this.router.navigate([`./statistics`], { relativeTo: this.activatedRoute });
	}
}
