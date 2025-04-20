import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { GradeService } from '../services/grade.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Grade } from '../models/grade';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-grade-update',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgFor ],
  providers: [ GradeService ],
  templateUrl: './grade-update.component.html',
  styleUrl: './grade-update.component.css'
})
export class GradeUpdateComponent implements OnInit {
	id!: string;
	grade!: Grade;

	gradeForm: FormGroup = this.formBuilder.group({
		year: ['', Validators.required],
		group: ['', Validators.required],
		school: []
	});

	years: number[] = [];
	groups: string[] = [];

	constructor(
		private gradeService: GradeService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.grade = {};
	}

	ngOnInit(): void {
		this.years = Array.from({ length: 12 }, (_, i) => i + 1);
		this.groups = ['A', 'B', 'C', 'D', 'E', 'F'];
		this.id = this.activatedRoute.snapshot.params['id'];
		this.loadGrade();
	}

	loadGrade() {
		this.gradeService.getGrade(this.id).subscribe((data: Grade) => {
			this.grade = data;
			this.setForm();
		}, (error: HttpErrorResponse) => {
			  console.log(error.error.message);
			  this.router.navigate([`schools`]);
		});
	}

	setForm() {
		this.gradeForm.patchValue({
			year: this.grade.year,
			group: this.grade.group
		});
	}

	updateGrade() {
		this.gradeForm.patchValue({ school: this.grade.school?.id });
		console.log(this.gradeForm.value);
		this.gradeService.updateGrade(this.id, this.gradeForm.value).subscribe((data: Grade) => {
			this.router.navigate([`schools`]);
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
		});
	}
}
