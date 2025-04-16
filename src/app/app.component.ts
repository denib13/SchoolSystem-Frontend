import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { CdkColumnDef } from '@angular/cdk/table';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MaterialModule, NgIf ],
  providers:[CdkColumnDef],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'school-system';

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
