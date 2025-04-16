import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SchoolService } from '../services/school.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-school-create',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule ],
  providers: [ SchoolService ],
  templateUrl: './school-create.component.html',
  styleUrl: './school-create.component.css'
})
export class SchoolCreateComponent {
  schoolForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    city: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private schoolService: SchoolService, private router: Router) {}

  createSchool() {
    console.log(this.schoolForm.value);
    this.schoolService.createSchool(this.schoolForm.value).subscribe((data) => {
      console.log(data);
      this.router.navigate([`schools`]);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.errors);
    });
  }
}
