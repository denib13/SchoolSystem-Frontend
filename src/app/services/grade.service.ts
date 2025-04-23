import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from '../models/grade';
import { Student } from '../models/student';

@Injectable()
export class GradeService {
    private gradeUrl: string;

    constructor(private http: HttpClient) {
        this.gradeUrl = 'http://localhost:8080/api/grades/';
    }

    public createGrade(grade: any): Observable<Grade> {
        return this.http.post<Grade>(this.gradeUrl, grade);
    }

    public getGrade(id: string): Observable<Grade> {
        return this.http.get<Grade>(this.gradeUrl + `${id}`);
    }

    public updateGrade(id: string, grade: Grade): Observable<Grade> {
        return this.http.put<Grade>(this.gradeUrl + `${id}`, grade);
    }

    public deleteGrade(id: string) {
        return this.http.delete(this.gradeUrl + `${id}`);
    }

    public getSubjectsByGrade(id: string, pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                                .append("pageNo", pageNo)
                                .append("pageSize", pageSize);
        return this.http.get<any>(this.gradeUrl + `${id}/subjects`, { params: queryParams });
    }

    public getStudentsByGrade(id: string): Observable<Student[]> {
        return this.http.get<Student[]>(this.gradeUrl + `${id}/students`);
    }
}
