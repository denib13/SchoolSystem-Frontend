import { Component, OnInit } from '@angular/core';
import { Headmaster } from '../../models/headmaster';
import { MaterialModule } from '../../material/material.module';
import { SchoolService } from '../../services/school.service';
import { HeadmasterService } from '../../services/headmaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { School } from '../../models/school';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-school-add-headmaster',
  standalone: true,
  imports: [ MaterialModule, NgIf, ReactiveFormsModule ],
  providers: [ SchoolService, HeadmasterService ],
  templateUrl: './school-add-headmaster.component.html',
  styleUrl: './school-add-headmaster.component.css'
})
export class SchoolAddHeadmasterComponent implements OnInit {
	displayedColumns: string[] = ['name', 'surname', 'username', 'action'];
  	headmasters: Headmaster[] = [];
	schoolId!: string;
	assignedHeadmasterId: string = '';
	assignedHeadmaster: Headmaster = {};

  	pageNo: number = 0;
  	pageSize: number = 5;
  	totalItems: number = 0;

	constructor(
		private schoolService: SchoolService,
		private headmasterService: HeadmasterService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit(): void {
		this.schoolId = this.activatedRoute.snapshot.params['id'];
		this.loadAssignedHeadmaster();
		this.loadHeadmasters();
	}

	loadAssignedHeadmaster() {
		this.schoolService.getSchool(this.schoolId).subscribe((school: School) => {
			this.assignedHeadmasterId = school.headmaster?.id || '';
			if(this.assignedHeadmasterId != '') {
				this.headmasterService.getHeadmaster(this.assignedHeadmasterId).subscribe((data: Headmaster) => {
					this.assignedHeadmaster = data;
				});
			}
			this.loadHeadmasters();
		})
	}

	loadHeadmasters() {
		this.headmasterService.getUnassignedHeadmasters(this.pageNo, this.pageSize).subscribe((data) => {
			this.headmasters = data.content;
			this.totalItems = data.totalElements;
		})
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadHeadmasters();
	}

	assignHeadmaster(headmasterId: string) {
		this.headmasterService.getHeadmaster(headmasterId).subscribe((headmaster: Headmaster) => {
			const headmasterUpdate: FormGroup = this.formBuilder.group({
				name: headmaster.name,
				middleName: headmaster.middleName,
				surname: headmaster.surname,
				nationalIdNumber: headmaster.nationalIdNumber,
				username: headmaster.username,
				password: '111111',
				email: headmaster.email,
				school: this.schoolId
			});
			this.headmasterService.updateHeadmaster(headmasterId, headmasterUpdate.value).subscribe(() => {
				this.location.back();
			});
		});
	}

	removeHeadmaster(headmasterId: string) {
		this.headmasterService.getHeadmaster(headmasterId).subscribe((headmaster: Headmaster) => {
			const headmasterUpdate: FormGroup = this.formBuilder.group({
				name: headmaster.name,
				middleName: headmaster.middleName,
				surname: headmaster.surname,
				nationalIdNumber: headmaster.nationalIdNumber,
				username: headmaster.username,
				password: '111111',
				email: headmaster.email,
				school: null
			});
			this.headmasterService.updateHeadmaster(headmasterId, headmasterUpdate.value).subscribe(() => {
				this.location.back();
			});
		});
	}
}
