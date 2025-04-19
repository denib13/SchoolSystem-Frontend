import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { ParentService } from '../../services/parent.service';
import { Parent } from '../../models/parent';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ ParentService ],
  templateUrl: './parent-list.component.html',
  styleUrl: './parent-list.component.css'
})
export class ParentListComponent implements OnInit {
	displayedColumns: string[] = ['name', 'surname', 'username', 'details'];
	parents: Parent[] = [];
	
	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	constructor(
		private parentService: ParentService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.loadParents();
	}

	loadParents() {
		this.parentService.getParents(this.pageNo, this.pageSize).subscribe((data) => {
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
