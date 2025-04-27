import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { StudentService } from '../../services/student.service';
import { Parent } from '../../models/parent';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-student-parent-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ StudentService ],
  templateUrl: './student-parent-list.component.html',
  styleUrl: './student-parent-list.component.css'
})
export class StudentParentListComponent implements OnInit {
	displayedColumns: string[] = ['name', 'surname', 'username', 'details'];
	parents: Parent[] = [];
	studentId!: string;
	
	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	constructor(
		private studentService: StudentService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.studentId = this.activatedRoute.snapshot.params['id'];
		this.loadParents();
	}

	loadParents() {
		this.studentService.getParents(this.studentId, this.pageNo, this.pageSize).subscribe((data) => {
			this.parents = data.content;
			this.totalItems = data.totalElements;
		});
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadParents();
	}

	viewDetails(id: string) {
		console.log(id);
		this.router.navigate([`parents/${id}`]);
	}
}
