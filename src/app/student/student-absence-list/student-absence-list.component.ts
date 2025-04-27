import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Absence } from '../../models/absence';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-student-absence-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ StudentService ],
  templateUrl: './student-absence-list.component.html',
  styleUrl: './student-absence-list.component.css'
})
export class StudentAbsenceListComponent implements OnInit {
	displayedColumns: string[] = ['subject', 'createdAt', 'details'];
	absences: Absence[] = [];
	id!: string;
	
	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	constructor(
		private studentService: StudentService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.loadAbsences();
	}

	loadAbsences() {
		this.studentService.getAbsencesByStudent(this.id, this.pageNo, this.pageSize).subscribe((data) => {
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
