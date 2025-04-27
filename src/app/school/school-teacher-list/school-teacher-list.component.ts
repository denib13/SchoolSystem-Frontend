import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { MaterialModule } from '../../material/material.module';
import { SchoolService } from '../../services/school.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-school-teacher-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ SchoolService ],
  templateUrl: './school-teacher-list.component.html',
  styleUrl: './school-teacher-list.component.css'
})
export class SchoolTeacherListComponent implements OnInit {
	displayedColumns: string[] = ['name', 'surname', 'username', 'details'];
	teachers: Teacher[] = [];
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
		this.loadTeachers();
	}

	loadTeachers() {
		this.schoolService.getTeachersPageBySchool(this.schoolId, this.pageNo, this.pageSize).subscribe((data) => {
			this.teachers = data.content;
			this.totalItems = data.totalElements;
		});
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadTeachers();
	}

	viewDetails(id: string) {
		console.log(id);
		this.router.navigate([`teachers/${id}`]);
	}
}
