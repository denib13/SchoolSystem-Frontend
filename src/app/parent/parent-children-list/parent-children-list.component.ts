import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { ParentService } from '../../services/parent.service';
import { Student } from '../../models/student';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-parent-children-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ ParentService ],
  templateUrl: './parent-children-list.component.html',
  styleUrl: './parent-children-list.component.css'
})
export class ParentChildrenListComponent implements OnInit {
	displayedColumns: string[] = ['name', 'surname', 'username', 'details'];
	students: Student[] = [];
	parentId!: string;

	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	constructor(
		private parentService: ParentService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.parentId = this.activatedRoute.snapshot.params['id'];
		this.loadChildren();
	}

	loadChildren() {
		this.parentService.getChildren(this.parentId, this.pageNo, this.pageSize).subscribe((data) => {
			this.students = data.content;
			this.totalItems = data.totalElements;
		});
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadChildren();
	}

	viewDetails(id: string) {
		this.router.navigate([`students/${id}`], )
	}
}
