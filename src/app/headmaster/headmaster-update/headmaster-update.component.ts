import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeadmasterService } from '../../services/headmaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Headmaster } from '../../models/headmaster';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-headmaster-update',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgIf ],
  providers: [ HeadmasterService ],
  templateUrl: './headmaster-update.component.html',
  styleUrl: './headmaster-update.component.css'
})
export class HeadmasterUpdateComponent implements OnInit {
  id!: string;
  headmaster!: Headmaster;
  errorMessages: string[] = [];

  headmasterForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    middleName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]], 
    surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    nationalIdNumber: [''],
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
    password: [''],
    email: ['']
  })

  constructor(
    private headmasterService: HeadmasterService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.headmaster = {};
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loadHeadmaster();
  }

  loadHeadmaster() {
    this.headmasterService.getHeadmaster(this.id).subscribe((data: Headmaster) => {
      console.log(data);
      this.headmaster = data;
      this.setForm();
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
      this.router.navigate([`headmasters`]);
    });
  }

  setForm() {
    this.headmasterForm.patchValue({ 
      name: this.headmaster.name,
      middleName: this.headmaster.middleName,
      surname: this.headmaster.surname,
      username: this.headmaster.username,
      password: '111111',
      email: this.headmaster.email
    });
    console.log(this.headmasterForm.value);
  }

  updateHeadmaster() {
    this.headmasterForm.patchValue({
      nationalIdNumber: this.headmaster.nationalIdNumber,
      email: this.headmaster.email 
    });
    console.log(this.headmasterForm.value);
    this.headmasterService.updateHeadmaster(this.id, this.headmasterForm.value).subscribe((data) => {
      this.router.navigate([`headmasters`]);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.errors);
    });
  }
}
