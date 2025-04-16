import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/login/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: '', component: AppComponent, canActivate: [AuthGuard] },
];
