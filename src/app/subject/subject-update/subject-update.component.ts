import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SubjectService } from '../../services/subject.service';
import { GradeService } from '../../services/grade.service';
import { SchoolService } from '../../services/school.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from '../../models/teacher';
import { Subject } from '../../models/subject';
import { HttpErrorResponse } from '@angular/common/http';
import { Grade } from '../../models/grade';

@Component({
  selector: 'app-subject-update',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgFor, NgIf ],
  providers: [ SubjectService, GradeService, SchoolService ],
  templateUrl: './subject-update.component.html',
  styleUrl: './subject-update.component.css'
})
export class SubjectUpdateComponent implements OnInit {
	subjectForm: FormGroup = this.formBuilder.group({
		name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
		semester: ['', Validators.required],
		teacher: ['', Validators.required],
		schoolClass: ['']
	});

	subjectId!: string;
	subject: Subject;
	grade: Grade;
	teachers: Teacher[] = [];
	semesters: number[] = [1, 2]; 

	constructor(
		private subjectService: SubjectService,
		private gradeService: GradeService,
		private schoolService: SchoolService,
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private router: Router
	) {
		this.subject = {};
		this.grade = {};
	}

	ngOnInit(): void {
		this.subjectId = this.activatedRoute.snapshot.params['id'];
		this.loadSubject();
	}

	loadSubject() {
		this.subjectService.getSubject(this.subjectId).subscribe((data: Subject) => {
			this.subject = data;
			this.loadGrade();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
			this.router.navigate([`schools`]);
		});
	}

	loadGrade() {
		const gradeId: string = this.subject.schoolClass?.id ?? '';
		this.gradeService.getGrade(gradeId).subscribe((data: Grade) => {
			this.grade = data;
			console.log(this.grade);
			this.loadTeachers();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
			this.router.navigate([`subjects/${this.subject.id}`]);
		})
	}

	loadTeachers() {
		const schoolId: string = this.grade.school?.id ?? '';
		this.schoolService.getTeachersBySchool(schoolId).subscribe((data: Teacher[]) => {
			this.teachers = data;
			console.log(data);
			this.setForm();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
			this.router.navigate([`subjects/${this.subject.id}`]);
		});
	}

	setForm() {
		this.subjectForm.patchValue({
			name: this.subject.name,
			semester: this.subject.semester,
			teacher: this.subject.teacher?.id
		});
	}

	updateSubject() {
		this.subjectForm.patchValue({
			schoolClass: this.subject.schoolClass?.id
		});
		console.log(this.subjectForm.value);
		this.subjectService.updateSubject(this.subjectId, this.subjectForm.value).subscribe((data: Subject) => {
			this.router.navigate([`subjects/${this.subjectId}`]);
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
			this.router.navigate([`subjects/${this.subjectId}`]);
		});
	}
}
