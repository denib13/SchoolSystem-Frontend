import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SchoolService } from '../services/school.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { School } from '../models/school';

@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ SchoolService ],
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.css'
})
export class SchoolListComponent implements OnInit {
  title: string = "Schools";
  displayedColumns: string[] = ['name', 'city', 'details'];
  schools: School[] = [];

  pageNo: number = 0;
  pageSize: number = 5;
  totalItems: number = 0;

  constructor(private schoolService:  SchoolService, private router: Router) {}

  ngOnInit(): void {
    this.loadSchools();
  }

  loadSchools() {
    this.schoolService.getSchools(this.pageNo, this.pageSize).subscribe( data => {
      console.log(data);
      this.schools = data.content;
      this.totalItems = data.totalElements;
    });
  }

  getPageData(event: PageEvent) {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadSchools();
  }

  viewDetails(id: string) {
    console.log(id);
    this.router.navigate([`schools/${id}`]);
  }
}
