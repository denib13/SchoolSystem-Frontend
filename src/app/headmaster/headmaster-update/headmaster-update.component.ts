import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeadmasterService } from '../../services/headmaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Headmaster } from '../../models/headmaster';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-headmaster-update',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule ],
  providers: [ HeadmasterService ],
  templateUrl: './headmaster-update.component.html',
  styleUrl: './headmaster-update.component.css'
})
export class HeadmasterUpdateComponent implements OnInit {
  id!: string;
  headmaster!: Headmaster;
  errorMessages: string[] = [];

  headmasterForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    middleName: ['', Validators.required], 
    surname: ['', Validators.required],
    nationalIdNumber: [''],
    username: ['', Validators.required],
    password: ['', Validators.required],
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
