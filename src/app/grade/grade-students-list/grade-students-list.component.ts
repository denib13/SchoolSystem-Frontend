import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { GradeService } from '../../services/grade.service';
import { Student } from '../../models/student';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-grade-students-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ GradeService ],
  templateUrl: './grade-students-list.component.html',
  styleUrl: './grade-students-list.component.css'
})
export class GradeStudentsListComponent implements OnInit {
	displayedColumns: string[] = ['name', 'surname', 'username', 'details'];
	students: Student[] = [];
	gradeId!: string;

	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;	

	constructor(
		private gradeService: GradeService,
		private acctivatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.gradeId = this.acctivatedRoute.snapshot.params['id'];
		this.loadStudents();
	}

	loadStudents() {
		this.gradeService.getStudentsPageByGrade(this.gradeId, this.pageNo, this.pageSize).subscribe(data => {
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
