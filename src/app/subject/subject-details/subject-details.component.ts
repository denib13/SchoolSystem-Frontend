import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../models/subject';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-subject-details',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ SubjectService ],
  templateUrl: './subject-details.component.html',
  styleUrl: './subject-details.component.css'
})
export class SubjectDetailsComponent implements OnInit {
	id!: string;
	subject!: Subject;

	constructor(
		private subjectService: SubjectService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.subject = {};
	}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		console.log(this.id);
		this.subjectService.getSubject(this.id).subscribe((data: Subject) => {
			this.subject = data;
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
			this.router.navigate([`schools`]);
		});
	}

	updateSubject() {
		this.router.navigate([`./update`], { relativeTo: this.activatedRoute });
	}
	
	deleteSubject() {
		this.subjectService.deleteSubject(this.id).subscribe();
		this.router.navigate([`schools`]);
	}

	createMark() {
		this.router.navigate([`./createMark`], { relativeTo: this.activatedRoute });
	}

	getMarks() {
		this.router.navigate([`./marks`], { relativeTo: this.activatedRoute });
	}

	createRemark() {
		this.router.navigate([`./createRemark`], { relativeTo: this.activatedRoute });
	}

	getRemarks() {
		this.router.navigate([`./remarks`], { relativeTo: this.activatedRoute });
	}
}
