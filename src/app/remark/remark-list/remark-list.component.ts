import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SubjectService } from '../../services/subject.service';
import { Remark } from '../../models/remark';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-remark-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ SubjectService ],
  templateUrl: './remark-list.component.html',
  styleUrl: './remark-list.component.css'
})
export class RemarkListComponent implements OnInit {
	displayedColumns: string[] = ['student', 'heading', 'details'];
	remarks: Remark[] = [];
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
		this.loadRemarks();
	}

	loadRemarks() {
		this.subjectService.getRemarksBySubject(this.id, this.pageNo, this.pageSize).subscribe((data) => {
			this.remarks = data.content;
			this.totalItems = data.totalElements;
			console.log(data.content);
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
