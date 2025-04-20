import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SchoolService } from '../services/school.service';
import { Grade } from '../models/grade';
import { School } from '../models/school';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-grade-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ SchoolService ],
  templateUrl: './grade-list.component.html',
  styleUrl: './grade-list.component.css'
})
export class GradeListComponent implements OnInit {
	displayedColumns: string[] = ['year', 'group', 'details'];
	grades: Grade[] = [];
	id!: string;

	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	constructor(
		private schoolService: SchoolService, 
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.loadGrades();
	}

	loadGrades() {
		this.schoolService.getGradesBySchool(this.id, this.pageNo, this.pageSize).subscribe( data => {
			this.grades = data.content;
			this.totalItems = data.totalElements;
		});
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadGrades();
	}

	viewDetails(id: string) {
		console.log(id);
		this.router.navigate([`grades/${id}`]);
	}
}
