import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { GradeService } from '../../services/grade.service';
import { Subject } from '../../models/subject';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ GradeService ],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css'
})
export class SubjectListComponent implements OnInit {
	displayedColumns: string[] = ['name', 'semester', 'details'];
	subjects: Subject[] = [];
	id!: string;
	
	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	constructor(
		private gradeService: GradeService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.loadSubjects();
	}

	loadSubjects() {
		this.gradeService.getSubjectsByGrade(this.id, this.pageNo, this.pageSize).subscribe((data) => {
			this.subjects = data.content;
			this.totalItems = data.totalElements;
			console.log(this.subjects);
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
