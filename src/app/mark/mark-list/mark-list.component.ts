import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SubjectService } from '../../services/subject.service';
import { Mark } from '../../models/mark';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-mark-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ SubjectService ],
  templateUrl: './mark-list.component.html',
  styleUrl: './mark-list.component.css'
})
export class MarkListComponent implements OnInit {
	displayedColumns: string[] = ['student', 'value', 'details'];
	marks: Mark[] = [];
	id!: string;

	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	constructor(
		private subjectService: SubjectService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}
	
	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.loadMarks();
	}

	loadMarks() {
		this.subjectService.getMarksBySubject(this.id, this.pageNo, this.pageSize).subscribe((data) => {
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
