import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Location, NgIf } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolService } from '../../services/school.service';
import { GradeService } from '../../services/grade.service';
import { Grade } from '../../models/grade';
import { HttpErrorResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-grade-add-student',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgIf ],
  providers: [ StudentService, SchoolService, GradeService ],
  templateUrl: './grade-add-student.component.html',
  styleUrl: './grade-add-student.component.css'
})
export class GradeAddStudentComponent implements OnInit {
	displayedColumns: string[] = ['name', 'surname', 'username', 'status'];
	students: Student[] = [];

	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	gradeId!: string;
	grade: Grade = {};

	constructor(
		private studentService: StudentService,
		private gradeService: GradeService,
		private schoolService: SchoolService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit(): void {
		this.gradeId = this.activatedRoute.snapshot.params['id'];
		this.loadGrade();
	}

	loadGrade() {
		this.gradeService.getGrade(this.gradeId).subscribe((data: Grade) => {
			this.grade = data;
			this.loadStudents();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
			this.location.back();
		});
	}

	loadStudents() {
		// load these students that are in the school
		const schoolId: string = this.grade.school?.id || '';
		this.schoolService.getStudentsBySchool(schoolId, this.pageNo, this.pageSize).subscribe((data) => {
			this.students = data.content;
			this.totalItems = data.totalElements;
			this.filterStudents();
		}, (error: HttpErrorResponse) => {
			this.location.back();
		});
	}

	filterStudents() {
		this.students = this.students.filter(student => !student.schoolClass || student.schoolClass.id === this.gradeId);
		//this.totalItems = this.students.length;
		console.log(this.students);
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadStudents();
	}

	addStudentToGrade(studentId: string) {
		this.studentService.getStudent(studentId).subscribe(student => {
			const studentUpdate: FormGroup = this.formBuilder.group({
				name: student.name,
				middleName: student.middleName,
				surname: student.surname,
				nationalIdNumber: student.nationalIdNumber, 
				username: student.username,
				password: '111111',
				email: student.email,
				school: student.school?.id,
				schoolClass: this.gradeId
			});
			console.log(studentUpdate. value);
			this.studentService.updateStudent(studentId, studentUpdate.value).subscribe(() => {
				this.location.back();
			});
		});
	}

	removeStudentFromGrade(studentId: string) {
		this.studentService.getStudent(studentId).subscribe(student => {
			const studentUpdate: FormGroup = this.formBuilder.group({
				name: student.name,
				middleName: student.middleName,
				surname: student.surname,
				nationalIdNumber: student.nationalIdNumber, 
				username: student.username,
				password: '111111',
				email: student.email,
				school: student.school?.id,
				schoolClass: null
			});
			console.log(studentUpdate. value);
			this.studentService.updateStudent(studentId, studentUpdate.value).subscribe(() => {
				this.location.back();
			});
		});
	}
}
