import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ StudentService ],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {
	student!: Student;
	id!: string;

	constructor(
		private studentService: StudentService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.student = {};
	}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.studentService.getStudent(this.id).subscribe((data: Student) => {
			this.student = data;
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
			this.router.navigate([`**`]);
		});
	}

	updateStudent() {
		this.router.navigate([`./update`], { relativeTo: this.activatedRoute });
	}

	deleteStudent() {
		this.studentService.deleteStudent(this.id).subscribe();
		this.router.navigate([`students`]);
	}

	getMarks() {
		this.router.navigate([`./marks`], { relativeTo: this.activatedRoute });
	}

	getRemarks() {
		this.router.navigate([`./remarks`], { relativeTo: this.activatedRoute });
	}

	getAbsences() {
		this.router.navigate([`./absences`], { relativeTo: this.activatedRoute });
	}
}
