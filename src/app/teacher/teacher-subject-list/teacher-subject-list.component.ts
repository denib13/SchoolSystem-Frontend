import { Component, OnInit } from '@angular/core';
import { Subject } from '../../models/subject';
import { MaterialModule } from '../../material/material.module';
import { TeacherService } from '../../services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-teacher-subject-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ TeacherService ],
  templateUrl: './teacher-subject-list.component.html',
  styleUrl: './teacher-subject-list.component.css'
})
export class TeacherSubjectListComponent implements OnInit {
	displayedColumns: string[] = ['name', 'semester', 'details'];
	subjects: Subject[] = [];
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
		this.loadSubjects();
	}

	loadSubjects() {
		this.teacherService.getTeacherSubjects(this.teacherId, this.pageNo, this.pageSize).subscribe((data) => {
			this.subjects = data.content;
			this.totalItems = data.totalElements;
		});
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadSubjects();
	}

	viewDetails(id: string) {
		console.log(id);
		this.router.navigate([`subjects/${id}`]);
	}
}
