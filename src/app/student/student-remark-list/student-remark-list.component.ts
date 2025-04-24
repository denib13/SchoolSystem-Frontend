import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { StudentService } from '../../services/student.service';
import { Remark } from '../../models/remark';
import { Student } from '../../models/student';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-student-remark-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ StudentService ],
  templateUrl: './student-remark-list.component.html',
  styleUrl: './student-remark-list.component.css'
})
export class StudentRemarkListComponent implements OnInit {
	displayedColumns: string[] = ['subject', 'heading', 'details'];
	remarks: Remark[] = [];
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
		this.loadRemarks();
	}

	loadRemarks() {
		this.studentService.getRemarksByStudent(this.id, this.pageNo, this.pageSize).subscribe((data) => {
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
