import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RemarkService } from '../../services/remark.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { Remark } from '../../models/remark';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-remark-update',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgIf ],
  providers: [ RemarkService ],
  templateUrl: './remark-update.component.html',
  styleUrl: './remark-update.component.css'
})
export class RemarkUpdateComponent implements OnInit {
	remarkForm: FormGroup = this.formBuilder.group({
		heading: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
		student: [''],
		teacher: [''],
		subject: [''],
		body: ['']
	});

	remarkId!: string;
	remark!: Remark; 

	constructor(
		private remarkService: RemarkService,
		private formBuilder: FormBuilder,
		private activateRoute: ActivatedRoute,
		private router: Router,
		private location: Location
	) {
		this.remark = {};
	}

	ngOnInit(): void {
		this.remarkId = this.activateRoute.snapshot.params['id'];
		this.remarkService.getRemark(this.remarkId).subscribe((data: Remark) => {
			this.remark = data;
			this.setForm();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
			this.location.back();
		});
	}

	setForm() {
		this.remarkForm.patchValue({
			student: this.remark.student?.id,
			teacher: this.remark.teacher?.id,
			subject: this.remark.subject?.id,
			heading: this.remark.heading,
			body: this.remark.body
		});
	}

	updateRemark() {
		console.log(this.remarkForm.value);
		this.remarkService.updateRemark(this.remarkId, this.remarkForm.value).subscribe((data: Remark) => {
			this.location.back();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
		});
	}
}
