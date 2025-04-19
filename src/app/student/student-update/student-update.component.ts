import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { StudentService } from '../../services/student.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-update',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule ],
  providers: [ StudentService ],
  templateUrl: './student-update.component.html',
  styleUrl: './student-update.component.css'
})
export class StudentUpdateComponent implements OnInit {
	id!: string;
	student!: Student;

	studentForm: FormGroup = this.formBuilder.group({
		name: ['', Validators.required],
		middleName: ['', Validators.required], 
		surname: ['', Validators.required],
		nationalIdNumber: [''],
		username: ['', Validators.required],
		password: [''],
		email: [''],
		school: [''],
		schoolClass: ['']
	});


	constructor(
		private studentService: StudentService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.student = {};
	}
	
	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.loadStudent();	
	}

	loadStudent() {
		this.studentService.getStudent(this.id).subscribe((data: Student) => {
			console.log(data);
			this.student = data;
			this.setForm();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
      		this.router.navigate([`students`]);
		});
	}

	setForm() {
		this.studentForm.patchValue({
			name: this.student.name,
			middleName: this.student.middleName,
			surname: this.student.surname,
			username: this.student.username,
			password: '111111',
			email: this.student.email
		});
	}

	updateStudent() {
		this.studentForm.patchValue({
			nationalIdNumber: this.student.nationalIdNumber,
			email: this.student.email,
			school: this.student.school?.id,
			schoolClass: this.student.schoolClass?.id
		});
		console.log(this.studentForm.value);
		this.studentService.updateStudent(this.id, this.studentForm.value).subscribe((data) => {
			this.router.navigate([`students`]);
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
		});
	}
}
