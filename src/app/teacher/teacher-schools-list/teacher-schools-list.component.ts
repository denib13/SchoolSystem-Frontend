import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { TeacherService } from '../../services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Teacher } from '../../models/teacher';
import { School } from '../../models/school';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-teacher-schools-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ TeacherService ],
  templateUrl: './teacher-schools-list.component.html',
  styleUrl: './teacher-schools-list.component.css'
})
export class TeacherSchoolsListComponent implements OnInit {
	teacherId!: string;
	displayedColumns: string[] = ['name', 'city', 'details'];
	schools: School[] = [];

	pageNo: number = 0;
  	pageSize: number = 5;
  	totalItems: number = 0;

	constructor(
		private teacherService: TeacherService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit(): void {
		this.teacherId = this.activatedRoute.snapshot.params['id'];
		this.loadSchools();
	}

	loadSchools() {
		this.teacherService.getTeacherSchools(this.teacherId, this.pageNo, this.pageSize).subscribe((data) => {
			this.schools = data.content;
			this.totalItems = data.totalElements;
		});
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadSchools();
	}

	viewDetails(id: string) {
		console.log(id);
		this.router.navigate([`schools/${id}`]);
	}
}
