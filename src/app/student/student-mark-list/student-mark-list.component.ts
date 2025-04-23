import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { StudentService } from '../../services/student.service';
import { Mark } from '../../models/mark';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-student-mark-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ StudentService ],
  templateUrl: './student-mark-list.component.html',
  styleUrl: './student-mark-list.component.css'
})
export class StudentMarkListComponent implements OnInit {
	displayedColumns: string[] = ['subject', 'value', 'details'];
	marks: Mark[] = [];
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
		this.loadMarks();
	}

	loadMarks() {
		this.studentService.getMarksByStudent(this.id, this.pageNo, this.pageSize).subscribe((data) => {
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
