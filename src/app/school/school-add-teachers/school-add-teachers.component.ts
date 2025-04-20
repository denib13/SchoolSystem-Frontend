import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { NgIf } from '@angular/common';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-school-add-teachers',
  standalone: true,
  imports: [ MaterialModule, NgIf, ReactiveFormsModule ],
  providers: [ TeacherService ],
  templateUrl: './school-add-teachers.component.html',
  styleUrl: './school-add-teachers.component.css'
})
export class SchoolAddTeachersComponent implements OnInit {
	displayedColumns: string[] = ['name', 'surname', 'username', 'status'];
	teachers: Teacher[] = [];

	pageNo: number = 0;
	pageSize: number = 5;
	totalItems: number = 0;

	id!: string;

	constructor(
		private teacherService: TeacherService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.loadTeachers();
	}

	loadTeachers() {
		this.teacherService.getTeachers(this.pageNo, this.pageSize).subscribe((data) => {
			this.teachers = data.content;
			this.totalItems = data.totalElements;
		});
	}

	getPageData(event: PageEvent) {
		this.pageNo = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadTeachers();
	}

	isInSchool(teacher: Teacher): boolean {
		return teacher.schools?.some(s => s.id === this.id) || false;
	}

	addTeacherToSchool(teacherId: string) {
		this.teacherService.getTeacher(teacherId).subscribe(teacher => {
			let updatedSchools = teacher.schools ? [...teacher.schools.map((s: any) => s.id)] : [];
			
			updatedSchools.push(this.id);
			console.log(updatedSchools);
			const teacherUpdate: FormGroup = this.formBuilder.group({
				name: teacher.name,
				middleName: teacher.middleName,
				surname: teacher.surname,
				nationalIdNumber: teacher.nationalIdNumber,
				username: teacher.username,
				password: '111111',
				email: teacher.email,
				schools: [updatedSchools]
			});
			
			console.log(this.id);
			console.log(teacherUpdate.value);
			this.teacherService.updateTeacher(teacherId, teacherUpdate.value).subscribe(() => {
				this.router.navigate([`schools/${this.id}`]);
			})
		});
	}

	removeTeacherFromSchool(teacherId: string) {
		this.teacherService.getTeacher(teacherId).subscribe(teacher => {
			let updatedSchools = teacher.schools ? 
            teacher.schools.filter((s: any) => s.id !== this.id) : [];
			updatedSchools = updatedSchools.map((s: any) => s.id);

        	console.log(updatedSchools);
			const teacherUpdate: FormGroup = this.formBuilder.group({
				name: teacher.name,
				middleName: teacher.middleName,
				surname: teacher.surname,
				nationalIdNumber: teacher.nationalIdNumber,
				username: teacher.username,
				password: '111111',
				email: teacher.email,
				schools: [updatedSchools]
			});
			console.log(teacherUpdate.value);
			this.teacherService.updateTeacher(teacherId, teacherUpdate.value).subscribe(() => {
				this.router.navigate([`schools/${this.id}`]);
			})
		});
	}
}
