import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-school-add-students',
  standalone: true,
  imports: [ MaterialModule, NgIf, ReactiveFormsModule ],
  providers: [ StudentService ], 
  templateUrl: './school-add-students.component.html',
  styleUrl: './school-add-students.component.css'
})
export class SchoolAddStudentsComponent implements OnInit {
	// need to have a button that says remove if student is in the school
	// and a button add if it doesnt have a school assigned
	displayedColumns: string[] = ['name', 'surname', 'username', 'status'];
	students: Student[] = [];

	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	id!: string;

	constructor(
		private studentService: StudentService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.loadStudents();
	}

	loadStudents() {
		this.studentService.getStudents(this.pageNo, this.pageSize).subscribe((data) => {
			this.students = data.content;
			this.totalItems = data.totalElements;
			this.filterStudents();
		});
	}

	filterStudents() {
		this.students = this.students.filter(student => !student.school || student.school.id === this.id);
		//this.totalItems = this.students.length;
		console.log(this.students);
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadStudents();
	}

	addStudentToSchool(studentId: string) {
		this.studentService.getStudent(studentId).subscribe(student => {
			const studentUpdate: FormGroup = this.formBuilder.group({
				name: student.name,
				middleName: student.middleName,
				surname: student.surname,
				nationalIdNumber: student.nationalIdNumber, 
				username: student.username,
				password: '111111',
				email: student.email,
				school: this.id,
				schoolClass: student.schoolClass?.id
			});
			console.log(studentUpdate. value);
			this.studentService.updateStudent(studentId, studentUpdate.value).subscribe(() => {
				this.router.navigate([`schools/${this.id}`]);
			});
		});
	}

	removeStudentFromSchool(studentId: string) {
		this.studentService.getStudent(studentId).subscribe(student => {
			const studentUpdate: FormGroup = this.formBuilder.group({
				name: student.name,
				middleName: student.middleName,
				surname: student.surname,
				nationalIdNumber: student.nationalIdNumber, 
				username: student.username,
				password: '111111',
				email: student.email,
				school: null,
				schoolClass: student.schoolClass?.id
			});
			console.log(studentUpdate. value);
			this.studentService.updateStudent(studentId, studentUpdate.value).subscribe(() => {
				this.router.navigate([`schools/${this.id}`]);
			});
		});
	}
}
