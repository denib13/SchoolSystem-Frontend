import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GradeService } from '../services/grade.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-grade-create',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgFor ],
  providers: [ GradeService ],
  templateUrl: './grade-create.component.html',
  styleUrl: './grade-create.component.css'
})
export class GradeCreateComponent implements OnInit {
	gradeForm: FormGroup = this.formBuilder.group({
		year: ['', Validators.required],
		group: ['', Validators.required],
		school: []
	});
	
	years: number[] = [];
	groups: string[] = [];
	id!: string;

	constructor(
		private gradeService: GradeService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.years = Array.from({ length: 12 }, (_, i) => i + 1);
		this.groups = ['A', 'B', 'C', 'D', 'E', 'F'];
		this.id = this.activatedRoute.snapshot.params['id'];
	}

	createGrade() {
		this.gradeForm.patchValue({ school: this.id });
		console.log(this.gradeForm.value);
		this.gradeService.createGrade(this.gradeForm.value).subscribe((data) => {
			this.router.navigate([`schools`]);
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
		});
	}
}
