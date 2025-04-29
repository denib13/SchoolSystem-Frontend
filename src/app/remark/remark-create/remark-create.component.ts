import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location, NgFor, NgIf } from '@angular/common';
import { RemarkService } from '../../services/remark.service';
import { SubjectService } from '../../services/subject.service';
import { GradeService } from '../../services/grade.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student';
import { Subject } from '../../models/subject';
import { HttpErrorResponse } from '@angular/common/http';
import { Remark } from '../../models/remark';

@Component({
  selector: 'app-remark-create',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgFor, NgIf ],
  providers: [ RemarkService, SubjectService, GradeService, AuthService ],
  templateUrl: './remark-create.component.html',
  styleUrl: './remark-create.component.css'
})
export class RemarkCreateComponent implements OnInit {
	remarkForm: FormGroup = this.formBuilder.group({
		heading: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
		student: ['', Validators.required],
		teacher: [''],
		subject: [''],
		body: ['']
	});

	subjectId!: string;
	subject: Subject = {};
	students: Student[] = [];
	
	constructor(
		private remarkService: RemarkService,
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

	createRemark() {
		const user = this.authService.getCurrentUser();
		const userId: string = user.id ?? '';
		this.remarkForm.patchValue({
			subject: this.subjectId,
			teacher: user.id
		});
		console.log(this.remarkForm.value);
		this.remarkService.createRemark(this.remarkForm.value).subscribe((data: Remark) => {
			this.location.back();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
		});
	}
}
