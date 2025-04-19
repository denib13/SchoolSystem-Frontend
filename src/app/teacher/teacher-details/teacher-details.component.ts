import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ TeacherService ],
  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.css'
})
export class TeacherDetailsComponent implements OnInit {
	teacher!: Teacher;
	id!: string;

	constructor(
		private teacherService: TeacherService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.teacher = {};
	}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.teacherService.getTeacher(this.id).subscribe((data: Teacher) => {
			this.teacher = data;
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
      		this.router.navigate([`**`]);
		});
	}

	updateTeacher() {
		this.router.navigate([`./update`], { relativeTo: this.activatedRoute });
	}

	deleteTeacher() {
		this.teacherService.deleteTeacher(this.id).subscribe();
		this.router.navigate([`teachers`]);
	}
}
