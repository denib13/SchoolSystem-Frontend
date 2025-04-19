import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ StudentService ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
	displayedColumns: string[] = ['name', 'surname', 'username', 'details'];
	students: Student[] = [];

	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	constructor(
		private studentService: StudentService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.loadStudents();
	}

	loadStudents() {
		this.studentService.getStudents(this.pageNo, this.pageSize).subscribe((data) => {
			this.students = data.content;
			this.totalItems = data.totalElements;
		});
	}

	getPageData(event: PageEvent) {
		  this.pageNo = event.pageIndex;
		  this.pageSize = event.pageSize;
		  this.loadStudents();
	}

	viewDetails(id: string) {
		this.router.navigate([`students/${id}`], )
	}
}
