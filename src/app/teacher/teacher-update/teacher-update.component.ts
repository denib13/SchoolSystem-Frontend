import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-teacher-update',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule ],
  providers: [ TeacherService ],
  templateUrl: './teacher-update.component.html',
  styleUrl: './teacher-update.component.css'
})
export class TeacherUpdateComponent implements OnInit {
	teacherForm: FormGroup = this.formBuilder.group({
		name: ['', Validators.required],
		middleName: ['', Validators.required], 
		surname: ['', Validators.required],
		nationalIdNumber: [''],
		username: ['', Validators.required],
		password: ['', Validators.required],
		email: ['']
	})

	id!: string;
	teacher!: Teacher;

	constructor(
		private formBuilder: FormBuilder,
		private teacherService: TeacherService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.teacher = {};
	}
	
	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.loadTeacher();
	}

	loadTeacher() {
		this.teacherService.getTeacher(this.id).subscribe((data: Teacher) => {
			this.teacher = data;
			this.setForm();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
      		this.router.navigate([`teachers`]);
		})
	}

	setForm() {
		this.teacherForm.patchValue({
			name: this.teacher.name,
			middleName: this.teacher.middleName,
			surname: this.teacher.surname,
			username: this.teacher.username,
			password: '111111',
			email: this.teacher.email
		});
		console.log(this.teacherForm.value);
	}

	updateTeacher() {
		this.teacherForm.patchValue({
			nationalIdNumber: this.teacher.nationalIdNumber,
			email: this.teacher.email
		});
		console.log(this.teacherForm.value);
		this.teacherService.updateTeacher(this.id, this.teacherForm.value).subscribe((data) => {
			this.router.navigate([`teachers`]);
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
		});
	}
}
