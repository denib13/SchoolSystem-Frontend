import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
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
import { SubjectCreateComponent } from './subject/subject-create/subject-create.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { SubjectDetailsComponent } from './subject/subject-details/subject-details.component';
import { SubjectUpdateComponent } from './subject/subject-update/subject-update.component';
import { MarkCreateComponent } from './mark/mark-create/mark-create.component';
import { MarkListComponent } from './mark/mark-list/mark-list.component';
import { StudentMarkListComponent } from './student/student-mark-list/student-mark-list.component';
import { MarkDetailsComponent } from './mark/mark-details/mark-details.component';
import { MarkUpdateComponent } from './mark/mark-update/mark-update.component';
import { RemarkCreateComponent } from './remark/remark-create/remark-create.component';
import { RemarkListComponent } from './remark/remark-list/remark-list.component';
import { StudentRemarkListComponent } from './student/student-remark-list/student-remark-list.component';
import { RemarkDetailsComponent } from './remark/remark-details/remark-details.component';
import { RemarkUpdateComponent } from './remark/remark-update/remark-update.component';
import { AbsenceListComponent } from './absence/absence-list/absence-list.component';
import { AbsenceCreateComponent } from './absence/absence-create/absence-create.component';
import { StudentAbsenceListComponent } from './student/student-absence-list/student-absence-list.component';
import { AbsenceDetailsComponent } from './absence/absence-details/absence-details.component';
import { TeacherSchoolsListComponent } from './teacher/teacher-schools-list/teacher-schools-list.component';
import { TeacherSubjectListComponent } from './teacher/teacher-subject-list/teacher-subject-list.component';
import { TeacherMarkListComponent } from './teacher/teacher-mark-list/teacher-mark-list.component';
import { TeacherRemarkListComponent } from './teacher/teacher-remark-list/teacher-remark-list.component';
import { TeacherAbsenceListComponent } from './teacher/teacher-absence-list/teacher-absence-list.component';
import { GradeAddStudentComponent } from './grade/grade-add-student/grade-add-student.component';
import { GradeStudentsListComponent } from './grade/grade-students-list/grade-students-list.component';
import { SchoolStudentListComponent } from './school/school-student-list/school-student-list.component';
import { SchoolTeacherListComponent } from './school/school-teacher-list/school-teacher-list.component';
import { StudentAddParentComponent } from './student/student-add-parent/student-add-parent.component';
import { StudentParentListComponent } from './student/student-parent-list/student-parent-list.component';
import { ParentChildrenListComponent } from './parent/parent-children-list/parent-children-list.component';
import { SchoolAddHeadmasterComponent } from './school/school-add-headmaster/school-add-headmaster.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { StudentStatisticsComponent } from './student/student-statistics/student-statistics.component';

export const routes: Routes = [
    { path: 'forbidden', component: ForbiddenComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { 
        path: 'schools',
        children: [
            {
                path: '',
                title: 'SchoolSystem | Schools',
                component: SchoolListComponent,
                canActivate: [AuthGuard],
                data: { allowedRoles: ['admin', 'headmaster'] }
            },
            {
                path: 'create',
                title: 'SchoolSystem | Create School',
                component: SchoolCreateComponent,
                canActivate: [AuthGuard],
                data: { allowedRoles: ['admin'] }
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
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin', 'headmaster'] }
                    },
                    {
                        path: 'addStudents',
                        component: SchoolAddStudentsComponent,
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin', 'headmaster'] }
                    },
                    {
                        path: 'addTeachers',
                        component: SchoolAddTeachersComponent,
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin', 'headmaster'] }
                    },
                    {
                        path: 'grades',
                        component: GradeListComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'createGrade',
                        component: GradeCreateComponent,
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin', 'headmaster'] }
                    },
                    {
                        path: 'students',
                        component: SchoolStudentListComponent,
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin', 'headmaster', 'teacher'] }
                    },
                    {
                        path: 'teachers',
                        component: SchoolTeacherListComponent,
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin', 'headmaster', 'teacher'] }
                    },
                    {
                        path: 'addHeadmaster',
                        component: SchoolAddHeadmasterComponent,
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin'] }
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
                canActivate: [AuthGuard],
                data: { allowedRoles: ['headmaster', 'admin'] }
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
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['headmaster', 'admin'] }
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
                canActivate: [AuthGuard],
                data: { allowedRoles: ['admin'] }
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
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin', 'headmaster', 'student'] }
                    },
                    {
                        path: 'marks',
                        component: StudentMarkListComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'remarks',
                        component: StudentRemarkListComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'absences',
                        component: StudentAbsenceListComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'addParents',
                        component: StudentAddParentComponent,
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin', 'headmaster'] }
                    },
                    {
                        path: 'parents',
                        component: StudentParentListComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'statistics',
                        component: StudentStatisticsComponent,
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
                canActivate: [AuthGuard],
                data: { allowedRoles: ['admin'] }
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
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin', 'headmaster', 'teacher'] }
                    },
                    {
                        path: 'schools',
                        component: TeacherSchoolsListComponent,
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin', 'headmaster', 'teacher'] }
                    },
                    {
                        path: 'subjects',
                        component: TeacherSubjectListComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'marks',
                        component: TeacherMarkListComponent,
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin', 'headmaster', 'teacher'] }
                    },
                    {
                        path: 'remarks',
                        component: TeacherRemarkListComponent,
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin', 'headmaster', 'teacher'] }
                    },
                    {
                        path: 'absences',
                        component: TeacherAbsenceListComponent,
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['admin', 'headmaster', 'teacher'] }
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
                canActivate: [AuthGuard],
                data: { allowedRoles: ['admin'] }
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
                        canActivate: [AuthGuard],
                        data: { allowedRoles: ['parent', 'admin'] }
                    },
                    {
                        path: 'children',
                        component: ParentChildrenListComponent,
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
                canActivate: [AuthGuard],
                data: { allowedRoles: ['admin', 'headmaster'] }
            }, 
            {
                path: 'createSubject',
                title: 'SchoolSystem | Create Subject',
                component: SubjectCreateComponent,
                canActivate: [AuthGuard],
                data: { allowedRoles: ['admin', 'headmaster'] }
            },
            {
                path: 'subjects',
                component: SubjectListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'addStudents',
                component: GradeAddStudentComponent,
                canActivate: [AuthGuard],
                data: { allowedRoles: ['headmaster', 'admin'] }
            },
            {
                path: 'students',
                component: GradeStudentsListComponent,
                canActivate: [AuthGuard]
            }
        ]
    }, 
    {
        path: 'subjects/:id',
        children: [
            {
                path: '',
                component: SubjectDetailsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'update',
                title: 'SchoolSystem | Update Subject',
                component: SubjectUpdateComponent,
                canActivate: [AuthGuard],
                data: { allowedRoles: ['admin', 'headmaster'] }
            },
            {
                path: 'createMark',
                title: 'SchoolSystem | Create Mark',
                component: MarkCreateComponent,
                canActivate: [AuthGuard],
                data: { allowedRoles: ['teacher'] }
            },
            {
                path: 'marks',
                title: 'SchoolSystem | Marks',
                component: MarkListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'remarks',
                title: 'SchoolSystem | Remarks',
                component: RemarkListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'createRemark',
                title: 'SchoolSystem | Create Remark',
                component: RemarkCreateComponent,
                canActivate: [AuthGuard],
                data: { allowedRoles: ['teacher'] }
            },
            {
                path: 'absences',
                title: 'SchoolSystem | Absences',
                component: AbsenceListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'createAbsence',
                title: 'SchoolSystem | Create Absence',
                component: AbsenceCreateComponent,
                canActivate: [AuthGuard],
                data: { allowedRoles: ['teacher'] }
            }
        ]
    },
    {
        path: 'marks/:id',
        children: [
            {
                path: '',
                component: MarkDetailsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'update',
                title: 'SchoolSystem | Update Mark',
                component: MarkUpdateComponent,
                canActivate: [AuthGuard],
                data: { allowedRoles: ['teacher', 'admin', 'headmaster'] }
            }
        ]
    },
    {
        path: 'remarks/:id',
        children: [
            {
                path: '',
                component: RemarkDetailsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'update',
                title: 'SchoolSystem | Update Remark',
                component: RemarkUpdateComponent,
                canActivate: [AuthGuard],
                data: { allowedRoles: ['teacher', 'admin', 'headmaster'] }
            }
        ]
    },
    {
        path: 'absences/:id',
        component: AbsenceDetailsComponent,
        canActivate: [AuthGuard]
    }
];
