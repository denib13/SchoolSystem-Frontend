import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { TeacherService } from '../../services/teacher.service';
import { Router } from '@angular/router';
import { Teacher } from '../../models/teacher';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ TeacherService ],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent implements OnInit {
	displayedColumns: string[] = ['name', 'surname', 'username', 'details'];
	teachers: Teacher[] = [];
	
	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	constructor(
		private teacherService: TeacherService,
		private router: Router
	) {}
	
	ngOnInit(): void {
		this.loadTeachers();
	}

	loadTeachers() {
		this.teacherService.getTeachers(this.pageNo, this.pageSize).subscribe((data) => {
			this.teachers = data.content;
			this.totalItems = data.totalElements;
			console.log(this.teachers);
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
