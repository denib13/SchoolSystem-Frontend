import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { ParentService } from '../../services/parent.service';
import { Parent } from '../../models/parent';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-parent-details',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ ParentService ],
  templateUrl: './parent-details.component.html',
  styleUrl: './parent-details.component.css'
})
export class ParentDetailsComponent implements OnInit {
	parent!: Parent;
	id!: string;

	constructor(
		private parentService: ParentService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.parent = {};
	}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.parentService.getParent(this.id).subscribe((data: Parent) => {
			this.parent = data;
		}, (error: HttpErrorResponse) => {
			console.log(error.error.message);
      		this.router.navigate([`**`]);
		});
	}

	updateParent() {
		this.router.navigate([`./update`], { relativeTo: this.activatedRoute });
	}

	deleteParent() {
		this.parentService.deleteParent(this.id).subscribe();
		this.router.navigate([`parents`]);
	}
}
