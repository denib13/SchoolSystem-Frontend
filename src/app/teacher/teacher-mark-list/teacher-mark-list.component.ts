import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { TeacherService } from '../../services/teacher.service';
import { Mark } from '../../models/mark';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-teacher-mark-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ TeacherService ],
  templateUrl: './teacher-mark-list.component.html',
  styleUrl: './teacher-mark-list.component.css'
})
export class TeacherMarkListComponent implements OnInit {
	displayedColumns: string[] = ['subject', 'student', 'value', 'details'];
	marks: Mark[] = [];
	teacherId!: string;

	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	constructor(
		private teacherService: TeacherService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.teacherId = this.activatedRoute.snapshot.params['id'];
		this.loadMarks();
	}

	loadMarks() {
		this.teacherService.getTeacherMarks(this.teacherId, this.pageNo, this.pageSize).subscribe(data => {
			this.marks = data.content;
			this.totalItems = data.totalElements;
		});
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadMarks();
	}

	viewDetails(id: string) {
		console.log(id);
		this.router.navigate([`marks/${id}`]);
	}
}
