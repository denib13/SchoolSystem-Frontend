import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { HeadmasterService } from '../../services/headmaster.service';
import { Headmaster } from '../../models/headmaster';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-headmaster-details',
  standalone: true,
  imports: [ MaterialModule, NgIf ],
  providers: [ HeadmasterService, AuthService ],
  templateUrl: './headmaster-details.component.html',
  styleUrl: './headmaster-details.component.css'
})
export class HeadmasterDetailsComponent implements OnInit {
  headmaster!: Headmaster;
  id!: string;

  constructor(
    private headmasterService: HeadmasterService, 
    private authService: AuthService,
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

  isAuthorized() {
    const role: string = this.authService.getRole();
    return role === 'admin' || role === 'headmaster';
  }

  isAuthorizedToUpdate() {
    const role: string = this.authService.getRole();
    return role === 'admin' || role === 'headmaster';
  }

  isAuthorizedToDelete() {
    const role: string = this.authService.getRole();
    return role === 'admin';
  }

  updateHeadmaster() {
    this.router.navigate([`./update`], { relativeTo: this.activatedRoute });
  }

  deleteHeadmaster() {
    this.headmasterService.deleteHeadmaster(this.id).subscribe();
    this.router.navigate(['headmasters']);
  }

  hasSchool(): boolean {
    const schoolId: string = this.headmaster.school?.id || '';
    return schoolId !== '';
  }

  getSchool() {
    if(this.hasSchool()) {
      const schoolId: string = this.headmaster.school?.id || '';
      this.router.navigate([`schools/${schoolId}`]);
    }
  }
}
