import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MarkService } from '../../services/mark.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Mark } from '../../models/mark';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mark-details',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ MarkService ],
  templateUrl: './mark-details.component.html',
  styleUrl: './mark-details.component.css'
})
export class MarkDetailsComponent implements OnInit {
	id!: string;
	mark!: Mark;

	constructor(
		private markService: MarkService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private location: Location
	) {
		this.mark = {};
	}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.markService.getMark(this.id).subscribe((data: Mark) => {
			this.mark = data;
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
			this.location.back();
		});
	}

	updateMark() {
		this.router.navigate([`./update`], { relativeTo: this.activatedRoute });
	}

	deleteMark() {
		this.markService.deleteMark(this.id).subscribe();
		this.location.back();
	}
}
