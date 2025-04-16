import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/login/auth.guard';
import { AppComponent } from './app.component';
import { SchoolListComponent } from './school/school-list.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';
import { SchoolUpdateComponent } from './school-update/school-update.component';
import { SchoolCreateComponent } from './school-create/school-create.component';

export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: '', component: AppComponent, canActivate: [AuthGuard] },
    { 
        path: 'schools',
        children: [
            {
                path: '',
                title: 'SchoolSystem | Schools',
                component: SchoolListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'create',
                title: 'SchoolSystem | Create School',
                component: SchoolCreateComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: SchoolDetailsComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'update',
                        title: 'SchoolSystem | Update School',
                        component: SchoolUpdateComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            }
        ]
    }
];
