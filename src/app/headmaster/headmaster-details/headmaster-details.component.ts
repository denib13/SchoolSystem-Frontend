import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { HeadmasterService } from '../../services/headmaster.service';
import { Headmaster } from '../../models/headmaster';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-headmaster-details',
  standalone: true,
  imports: [ MaterialModule ],
  providers: [ HeadmasterService ],
  templateUrl: './headmaster-details.component.html',
  styleUrl: './headmaster-details.component.css'
})
export class HeadmasterDetailsComponent implements OnInit {
  headmaster!: Headmaster;
  id!: string;

  constructor(
    private headmasterService: HeadmasterService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.headmaster = {};
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.headmasterService.getHeadmaster(this.id).subscribe((data: Headmaster) => {
      this.headmaster = data;
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
      this.router.navigate([`**`]);
    });
  }

  updateHeadmaster() {
    this.router.navigate([`./update`], { relativeTo: this.activatedRoute });
  }

  deleteHeadmaster() {
    this.headmasterService.deleteHeadmaster(this.id).subscribe();
    this.router.navigate(['headmasters']);
  }
}
