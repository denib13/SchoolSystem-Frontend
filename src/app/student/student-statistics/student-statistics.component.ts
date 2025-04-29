import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { StudentService } from '../../services/student.service';
import { Mark } from '../../models/mark';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

interface Average {
	subjectName: string;
	semester: number;
	average: number;
}

interface SemesterAverage {
	semester: number;
	average: number;
}
  

@Component({
  selector: 'app-student-statistics',
  standalone: true,
  imports: [ MaterialModule, NgIf ],
  providers: [ StudentService ],
  templateUrl: './student-statistics.component.html',
  styleUrl: './student-statistics.component.css'
})
export class StudentStatisticsComponent implements OnInit {
	displayedColumnsAverages: string[] = ['subjectName', 'semester', 'average'];
	displayedColumnsSemesterAverages: string[] = ['semester', 'average'];

	studentId!: string;
	marks: Mark[] = [];
	averageMarks = new MatTableDataSource<Average>();
	semesterAverageMarks = new MatTableDataSource<SemesterAverage>();

	constructor(
		private studentService: StudentService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.studentId = this.activatedRoute.snapshot.params['id'];
		this.loadMarks();
	}

	loadMarks() {
		this.studentService.getMarksList(this.studentId).subscribe((data: Mark[]) => {
			this.marks = data;
			console.log(data);
			this.calculateAverages(this.marks);
		});
	}

	calculateAverages(marks: Mark[]) {
		const subjectGroups = new Map<string, number[]>();
		const semesterGroups = new Map<number, number[]>();
	  
		for (const mark of marks) {
		  	if (mark.value) {
				const subjectKey = `${mark.subject?.name}__${mark.subject?.semester}`;
				if (!subjectGroups.has(subjectKey)) {
			  		subjectGroups.set(subjectKey, []);
				}
				subjectGroups.get(subjectKey)!.push(mark.value);
	  
				const semester = mark.subject?.semester!;
				if (!semesterGroups.has(semester)) {
			  		semesterGroups.set(semester, []);
				}
				semesterGroups.get(semester)!.push(mark.value);
		  	}
		}
	  
		const averages: Average[] = [];
		for (const [key, values] of subjectGroups.entries()) {
		  	const [subjectName, semesterStr] = key.split('__');
		  	const avg = values.reduce((a, b) => a + b, 0) / values.length;
		  	averages.push({
				subjectName,
				semester: +semesterStr,
				average: +avg.toFixed(2),
		  	});
		}
	  
		const semesterAverages: SemesterAverage[] = [];
		for (const [semester, values] of semesterGroups.entries()) {
		  	const avg = values.reduce((a, b) => a + b, 0) / values.length;
		  	semesterAverages.push({
				semester,
				average: +avg.toFixed(2),
		  	});
		}

		this.averageMarks.data = averages;
		this.semesterAverageMarks.data = semesterAverages;
	}
}
