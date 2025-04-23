import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MarkService } from '../../services/mark.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from '../../models/subject';
import { Student } from '../../models/student';
import { SubjectService } from '../../services/subject.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location, NgFor } from '@angular/common';
import { GradeService } from '../../services/grade.service';
import { Mark } from '../../models/mark';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mark-create',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgFor ],
  providers: [ MarkService, SubjectService, GradeService, AuthService ],
  templateUrl: './mark-create.component.html',
  styleUrl: './mark-create.component.css'
})
export class MarkCreateComponent implements OnInit {
	markForm: FormGroup = this.formBuilder.group({
		value: ['', Validators.required],
		student: ['', Validators.required],
		teacher: [''],
		subject: ['']
	});

	subjectId!: string;
	subject: Subject = {};
	students: Student[] = []; 
	values: number[] = [2, 3, 4, 5, 6];

	constructor(
		private markService: MarkService,
		private subjectService: SubjectService,
		private gradeService: GradeService,
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit(): void {
		this.subjectId = this.activatedRoute.snapshot.params['id'];
		this.loadSubject();
	}

	loadSubject() {
		this.subjectService.getSubject(this.subjectId).subscribe((data: Subject) => {
			this.subject = data;
			this.loadStudents();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
			this.location.back();
		});
	}

	loadStudents() {
		const gradeId: string = this.subject.schoolClass?.id ?? '';
		if(gradeId == '') {
			this.location.back();
		}
		this.gradeService.getStudentsByGrade(gradeId).subscribe((data: Student[]) => {
			this.students = data;
			console.log(data);
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
			this.location.back();
		});
	}

	createMark() {
		const user = this.authService.getCurrentUser();
		const userId: string = user.id ?? '';
		this.markForm.patchValue({
			subject: this.subject.id,
			teacher: user.id
		});
		console.log(this.markForm.value);
		this.markService.createMark(this.markForm.value).subscribe((data: Mark) => {
			this.location.back();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
		});
	}
}
