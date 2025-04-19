import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParentService } from '../../services/parent.service';
import { Parent } from '../../models/parent';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-parent-update',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule ],
  providers: [ ParentService ],
  templateUrl: './parent-update.component.html',
  styleUrl: './parent-update.component.css'
})
export class ParentUpdateComponent implements OnInit {
	id!: string;
	parent!: Parent;

	parentForm: FormGroup = this.formBuilder.group({
		name: ['', Validators.required],
		middleName: ['', Validators.required], 
		surname: ['', Validators.required],
		nationalIdNumber: [''],
		username: ['', Validators.required],
		password: ['', Validators.required],
		email: ['']
	})
	
	constructor(
		private parentService: ParentService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.parent = {};
	}
	
	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.loadParent();
	}

	loadParent() {
		this.parentService.getParent(this.id).subscribe((data: Parent) => {
			this.parent = data;
			this.setForm();
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
      		this.router.navigate([`parents`]);
		});
	}

	setForm() {
		this.parentForm.patchValue({
			name: this.parent.name,
			middleName: this.parent.middleName,
			surname: this.parent.surname,
			username: this.parent.username,
			password: '111111',
			email: this.parent.email
		});
	}

	updateParent() {
		this.parentForm.patchValue({
			nationalIdNumber: this.parent.nationalIdNumber,
			email: this.parent.email
		});
		console.log(this.parentForm.value);
		this.parentService.updateParent(this.id, this.parentForm.value).subscribe((data: Parent) => {
			this.router.navigate([`parents`]);
		}, (error: HttpErrorResponse) => {
			console.log(error.error.errors);
		});
	}
}
