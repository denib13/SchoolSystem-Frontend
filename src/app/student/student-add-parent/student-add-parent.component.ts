import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Location, NgIf } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { ParentService } from '../../services/parent.service';
import { Parent } from '../../models/parent';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-student-add-parent',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, NgIf ],
  providers: [ StudentService, ParentService ],
  templateUrl: './student-add-parent.component.html',
  styleUrl: './student-add-parent.component.css'
})
export class StudentAddParentComponent implements OnInit {
	displayedColumns: string[] = ['name', 'surname', 'username', 'status'];
	parents: Parent[] = [];
	studentId!: string;
	
	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	constructor(
		private parentService: ParentService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit(): void {
		this.studentId = this.activatedRoute.snapshot.params['id'];
		this.loadParents();
	}

	loadParents() {
		this.parentService.getParents(this.pageNo, this.pageSize).subscribe(data => {
			this.parents = data.content;
			this.totalItems = data.totalElements;
		})
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadParents();
	}

	isParentOfThisStudent(parent: Parent): boolean {
		return parent.children?.some(c => c.id === this.studentId) || false;
	}

	addParent(parentId: string) {
		this.parentService.getParent(parentId).subscribe((parent: Parent) => {
			let updatedChildren = parent.children ? [...parent.children.map((c: any) => c.id)] : [];
			updatedChildren.push(this.studentId);
			console.log(updatedChildren);

			const parentUpdate: FormGroup = this.formBuilder.group({
				name: parent.name,
				middleName: parent.middleName,
				surname: parent.surname,
				nationalIdNumber: parent.nationalIdNumber,
				username: parent.username,
				password: '111111',
				email: parent.email,
				children: [updatedChildren]
			});

			console.log(this.studentId);
			console.log(parentUpdate.value);
			
			this.parentService.updateParent(parentId, parentUpdate.value).subscribe(() => {
				this.location.back();
			});
		})
	}

	removeParent(parentId: string) {
		this.parentService.getParent(parentId).subscribe((parent: Parent) => {
			let updatedChildren = parent.children ? 
				parent.children.filter((c: any) => c.id !== this.studentId) : [];
			updatedChildren = updatedChildren.map((c: any) => c.id);
			console.log(updatedChildren);

			const parentUpdate: FormGroup = this.formBuilder.group({
				name: parent.name,
				middleName: parent.middleName,
				surname: parent.surname,
				nationalIdNumber: parent.nationalIdNumber,
				username: parent.username,
				password: '111111',
				email: parent.email,
				children: [updatedChildren]
			});

			console.log(this.studentId);
			console.log(parentUpdate.value);
			
			this.parentService.updateParent(parentId, parentUpdate.value).subscribe(() => {
				this.location.back();
			});
		})
	}
}
