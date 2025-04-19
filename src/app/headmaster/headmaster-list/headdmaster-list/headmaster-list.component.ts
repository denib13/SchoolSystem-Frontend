import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { HeadmasterService } from '../../../services/headmaster.service';
import { Router } from '@angular/router';
import { Headmaster } from '../../../models/headmaster';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-headmaster-list',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ HeadmasterService ],
  templateUrl: './headmaster-list.component.html',
  styleUrl: './headmaster-list.component.css'
})
export class HeadmasterListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'username', 'details'];
  headmasters: Headmaster[] = [];

  pageNo: number = 0;
  pageSize: number = 5;
  totalItems: number = 0;

  constructor(private headmasterService: HeadmasterService, private router: Router) {}

  ngOnInit(): void {
    this.loadHeadmasters();
  }

  loadHeadmasters() {
    this.headmasterService.getHeadmasters(this.pageNo, this.pageSize).subscribe((data) => {
      console.log(data.content);
      this.headmasters = data.content;
      this.totalItems = data.totalElements;
    });
  }

  getPageData(event: PageEvent) {
      this.pageNo = event.pageIndex;
      this.pageSize = event.pageSize;
      this.loadHeadmasters();
  }

  viewDetails(id: string) {
    console.log(id);
    this.router.navigate([`headmasters/${id}`]);
  }
}
