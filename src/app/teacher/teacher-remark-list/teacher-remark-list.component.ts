import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { TeacherService } from '../../services/teacher.service';
import { Remark } from '../../models/remark';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-teacher-remark-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ TeacherService ],
  templateUrl: './teacher-remark-list.component.html',
  styleUrl: './teacher-remark-list.component.css'
})
export class TeacherRemarkListComponent implements OnInit {
	displayedColumns: string[] = ['subject', 'student', 'heading', 'details'];
	remarks: Remark[] = [];
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
		this.loadRemarks();
	}

	loadRemarks() {
		this.teacherService.getTeacherRemarks(this.teacherId, this.pageNo, this.pageSize).subscribe(data => {
			this.remarks = data.content;
			this.totalItems = data.totalElements;
		});
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadRemarks();
	}

	viewDetails(id: string) {
		console.log(id);
		this.router.navigate([`remarks/${id}`]);
	}
}
