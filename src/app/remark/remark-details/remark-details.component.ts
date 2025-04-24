import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RemarkService } from '../../services/remark.service';
import { Remark } from '../../models/remark';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-remark-details',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ RemarkService ],
  templateUrl: './remark-details.component.html',
  styleUrl: './remark-details.component.css'
})
export class RemarkDetailsComponent implements OnInit {
	id!: string;
	remark!: Remark;

	constructor(
		private remarkService: RemarkService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private location: Location
	) {
		this.remark = {};
	}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.remarkService.getRemark(this.id).subscribe((data: Remark) => {
			this.remark = data;
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
			this.location.back();
		});
	}

	updateRemark() {
		this.router.navigate([`./update`], { relativeTo: this.activatedRoute });
	}

	deleteRemark() {
		this.remarkService.deleteRemark(this.id).subscribe();
		this.location.back();
	}
}
