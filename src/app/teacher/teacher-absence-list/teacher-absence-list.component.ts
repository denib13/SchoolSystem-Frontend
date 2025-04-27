import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { TeacherService } from '../../services/teacher.service';
import { Absence } from '../../models/absence';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-teacher-absence-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ TeacherService ],
  templateUrl: './teacher-absence-list.component.html',
  styleUrl: './teacher-absence-list.component.css'
})
export class TeacherAbsenceListComponent implements OnInit {
	displayedColumns: string[] = ['subject', 'student', 'createdAt', 'details'];
	absences: Absence[] = [];
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
		this.loadAbsences();
	}

	loadAbsences() {
		this.teacherService.getTeacherAbsences(this.teacherId, this.pageNo, this.pageSize).subscribe(data => {
			this.absences = data.content;
			this.totalItems = data.totalElements;
		});
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadAbsences();
	}

	viewDetails(id: string) {
		console.log(id);
		this.router.navigate([`absences/${id}`]);
	}
}
