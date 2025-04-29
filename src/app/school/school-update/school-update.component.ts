import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SchoolService } from '../../services/school.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from '../../models/school';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-school-update',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgIf ],
  providers: [ SchoolService ],
  templateUrl: './school-update.component.html',
  styleUrl: './school-update.component.css'
})
export class SchoolUpdateComponent implements OnInit {
  schoolForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
    city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]]
  });

  id!: string;
  school!: School;
  errorMessages: string[] = [];

  constructor(
    private schoolService: SchoolService, 
    private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) {
    this.school = {};
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loadSchool();
    //this.setForm();
  }

  loadSchool() {
    this.schoolService.getSchool(this.id).subscribe((data: School) => {
      console.log(data);
      this.school = data;
      this.setForm();
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
      this.router.navigate([`schools`]);
    });
  }

  setForm() {
    this.schoolForm.patchValue({ name: this.school.name });
    this.schoolForm.patchValue({ city: this.school.city });
    console.log(this.schoolForm.value);
  }

  updateSchool() {
    this.schoolService.updateSchool(this.id, this.schoolForm.value).subscribe((data) => {
      console.log(data);
      this.router.navigate([`schools`]);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.errors);
    });
  }
}
