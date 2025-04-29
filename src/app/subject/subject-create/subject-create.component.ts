import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SubjectService } from '../../services/subject.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade } from '../../models/grade';
import { Teacher } from '../../models/teacher';
import { TeacherService } from '../../services/teacher.service';
import { GradeService } from '../../services/grade.service';
import { SchoolService } from '../../services/school.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-subject-create',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgFor, NgIf ],
  providers: [ SubjectService, GradeService, SchoolService ],
  templateUrl: './subject-create.component.html',
  styleUrl: './subject-create.component.css'
})
export class SubjectCreateComponent implements OnInit {
	subjectForm: FormGroup = this.formBuilder.group({
		name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
		semester: ['', Validators.required],
		teacher: ['', Validators.required],
		schoolClass: ['']
	});
	
	schoolClassId!: string;
	grade!: Grade;
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
		this.grade = {};
	}

	ngOnInit(): void {
		this.schoolClassId = this.activatedRoute.snapshot.params['id'];
		this.loadGrade();
	}

	loadGrade() {
		this.gradeService.getGrade(this.schoolClassId).subscribe((data: Grade) => {
			this.grade = data;
			console.log(this.grade);
			this.loadTeachers();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
			this.router.navigate([`grades/${this.schoolClassId}`]);
		});
	}

	loadTeachers() {
		const schoolId: string = this.grade.school?.id ?? '';
		this.schoolService.getTeachersBySchool(schoolId).subscribe((data: Teacher[]) => {
			this.teachers = data;
			console.log(data);
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
			this.router.navigate([`grades/${this.schoolClassId}`]);
		});
	}

	createSubject() {
		this.subjectForm.patchValue({
			schoolClass: this.schoolClassId
		});
		console.log(this.subjectForm.value);
		this.subjectService.createSubject(this.subjectForm.value).subscribe((data) => {
			console.log(data);
      	this.router.navigate([`grades/${this.schoolClassId}`]);
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
		});
	}
}
