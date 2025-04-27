import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SchoolService } from '../../services/school.service';
import { School } from '../../models/school';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-school-details',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ SchoolService ],
  templateUrl: './school-details.component.html',
  styleUrl: './school-details.component.css'
})
export class SchoolDetailsComponent implements OnInit {
  school!: School;
  id!: string;

  constructor(private schoolService: SchoolService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.school = {};
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.schoolService.getSchool(this.id).subscribe((data: School) => {
      console.log(data);
      this.school = data;
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
      this.router.navigate([`**`]);
    });
  }

  updateSchool() {
    this.router.navigate([`./update`], {relativeTo: this.activatedRoute});
  }

  deleteSchool() {
    this.schoolService.deleteSchool(this.id).subscribe();
    this.router.navigate(['schools']);
  }

  createGrade() {
    this.router.navigate([`./createGrade`], { relativeTo: this.activatedRoute });
  }

  getGrades() {
    this.router.navigate([`./grades`], { relativeTo: this.activatedRoute });
  }

  addStudents() {
    this.router.navigate([`./addStudents`], { relativeTo: this.activatedRoute });
  }

  getStudents() {
    this.router.navigate([`./students`], { relativeTo: this.activatedRoute });
  }

  addTeachers() {
    this.router.navigate([`./addTeachers`], { relativeTo: this.activatedRoute });
  }

  getTeachers() {
    this.router.navigate([`./teachers`], { relativeTo: this.activatedRoute });
  }

  addHeadmaster() {
    this.router.navigate([`./addHeadmaster`], { relativeTo: this.activatedRoute });
  }
}
