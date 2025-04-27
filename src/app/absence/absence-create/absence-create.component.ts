import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { AbsenceService } from '../../services/absence.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, NgFor } from '@angular/common';
import { SubjectService } from '../../services/subject.service';
import { GradeService } from '../../services/grade.service';
import { AuthService } from '../../services/auth.service';
import { Subject } from '../../models/subject';
import { Student } from '../../models/student';
import { HttpErrorResponse } from '@angular/common/http';
import { Absence } from '../../models/absence';

@Component({
  selector: 'app-absence-create',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgFor ],
  providers: [ AbsenceService, SubjectService, GradeService, AuthService ],
  templateUrl: './absence-create.component.html',
  styleUrl: './absence-create.component.css'
})
export class AbsenceCreateComponent implements OnInit {
	absenceForm: FormGroup = this.formBuilder.group({
		student: ['', Validators.required],
		teacher: [''],
		subject: ['']
	});

	subjectId!: string;
	subject: Subject = {};
	students: Student[] = [];
	
	constructor(
		private absenceService: AbsenceService,
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

	createAbsence() {
		const user = this.authService.getCurrentUser();
		const userId: string = user.id ?? '';
		this.absenceForm.patchValue({
			subject: this.subject.id,
			teacher: user.id
		});
		console.log(this.absenceForm.value);
		this.absenceService.createAbsence(this.absenceForm.value).subscribe((data: Absence) => {
			this.location.back();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
		});	
	}
}
