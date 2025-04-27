import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SchoolService } from '../../services/school.service';
import { Student } from '../../models/student';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-school-student-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ SchoolService ],
  templateUrl: './school-student-list.component.html',
  styleUrl: './school-student-list.component.css'
})
export class SchoolStudentListComponent implements OnInit {
	displayedColumns: string[] = ['name', 'surname', 'username', 'details'];
	students: Student[] = [];
	schoolId!: string;

	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	constructor(
		private schoolService: SchoolService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.schoolId = this.activatedRoute.snapshot.params['id'];
		this.loadStudents();
	}

	loadStudents() {
		this.schoolService.getStudentsBySchool(this.schoolId, this.pageNo, this.pageSize).subscribe((data) => {
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
