import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MarkService } from '../../services/mark.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mark } from '../../models/mark';
import { HttpErrorResponse } from '@angular/common/http';
import { Location, NgFor } from '@angular/common';

@Component({
  selector: 'app-mark-update',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgFor ],
  providers: [ MarkService ],
  templateUrl: './mark-update.component.html',
  styleUrl: './mark-update.component.css'
})
export class MarkUpdateComponent implements OnInit {
	markForm: FormGroup = this.formBuilder.group({
		value: ['', Validators.required],
		student: [''],
		teacher: [''],
		subject: ['']
	});

	markId!: string;
	mark!: Mark;
	values: number[] = [2, 3, 4, 5, 6];

	constructor(
		private markService: MarkService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private location: Location
	) {
		this.mark = {};
	}

	ngOnInit(): void {
		this.markId = this.activatedRoute.snapshot.params['id'];
		this.loadMark();
	}

	loadMark() {
		this.markService.getMark(this.markId).subscribe((data: Mark) => {
			this.mark = data;
			this.setForm();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
			this.location.back();
		});
	}

	setForm() {
		this.markForm.patchValue({
			value: this.mark.value,
			student: this.mark.student?.id,
			teacher: this.mark.teacher?.id,
			subject: this.mark.subject?.id
		});
	}

	updateMark() {
		console.log(this.markForm.value);
		this.markService.updateMark(this.markId, this.markForm.value).subscribe((data: Mark) => {
			this.location.back();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
		});
	}
}
