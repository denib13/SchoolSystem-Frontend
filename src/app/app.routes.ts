import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/login/auth.guard';
import { AppComponent } from './app.component';
import { SchoolListComponent } from './school/school-list/school-list.component';
import { SchoolDetailsComponent } from './school/school-details/school-details.component';
import { SchoolUpdateComponent } from './school/school-update/school-update.component';
import { SchoolCreateComponent } from './school/school-create/school-create.component';
import { HeadmasterListComponent } from './headmaster/headmaster-list/headdmaster-list/headmaster-list.component';
import { HeadmasterDetailsComponent } from './headmaster/headmaster-details/headmaster-details.component';
import { HeadmasterUpdateComponent } from './headmaster/headmaster-update/headmaster-update.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { StudentUpdateComponent } from './student/student-update/student-update.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { TeacherDetailsComponent } from './teacher/teacher-details/teacher-details.component';
import { TeacherUpdateComponent } from './teacher/teacher-update/teacher-update.component';
import { ParentListComponent } from './parent/parent-list/parent-list.component';
import { ParentDetailsComponent } from './parent/parent-details/parent-details.component';
import { ParentUpdateComponent } from './parent/parent-update/parent-update.component';
import { GradeCreateComponent } from './grade/grade-create/grade-create.component';
import { GradeListComponent } from './grade/grade-list/grade-list.component';
import { GradeDetailsComponent } from './grade/grade-details/grade-details.component';
import { GradeUpdateComponent } from './grade/grade-update/grade-update.component';
import { SchoolAddStudentsComponent } from './school/school-add-students/school-add-students.component';
import { SchoolAddTeachersComponent } from './school/school-add-teachers/school-add-teachers.component';

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
                    },
                    {
                        path: 'addStudents',
                        component: SchoolAddStudentsComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'addTeachers',
                        component: SchoolAddTeachersComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'grades',
                        component: GradeListComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'createGrade',
                        component: GradeCreateComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            }
        ]
    },
    {
        path: 'headmasters',
        children: [
            {
                path: '',
                title: 'SchoolSystem | Headmasters',
                component: HeadmasterListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: HeadmasterDetailsComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'update',
                        component: HeadmasterUpdateComponent,
                        title: 'SchoolSystem | Update Headmaster',
                        canActivate: [AuthGuard]
                    }
                ]
            }
        ]
    },
    {
        path: 'students',
        children: [
            {
                path: '',
                title: 'SchoolSystem | Students',
                component: StudentListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: StudentDetailsComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'update',
                        title: 'SchoolSystem | Update Student',
                        component: StudentUpdateComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            }
        ]
    },
    {
        path: 'teachers',
        children: [
            {
                path: '',
                title: 'SchoolSystem | Teachers',
                component: TeacherListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: TeacherDetailsComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'update',
                        title: 'SchoolSystem | Update Teacher',
                        component: TeacherUpdateComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            }
        ]
    },
    {
        path: 'parents',
        children: [
            {
                path: '',
                title: 'SchoolSystem | Parents',
                component: ParentListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: ParentDetailsComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'update',
                        title: 'SchoolSystem | Update Parent',
                        component: ParentUpdateComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            }
        ]
    },
    {
        path: 'grades/:id',
        children: [
            {
                path: '',
                component: GradeDetailsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'update',
                title: 'SchoolSystem | Update Grade',
                component: GradeUpdateComponent,
                canActivate: [AuthGuard]
            }
        ]
    }    
];
