import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { Mark } from '../models/mark';

@Injectable()
export class StudentService {
    private studentUrl: string;

    constructor(private http: HttpClient) {
        this.studentUrl = 'http://localhost:8080/api/students/';
    }

    public getStudents(pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                                .append("pageNo", pageNo)
                                .append("pageSize", pageSize);
        return this.http.get<any>(this.studentUrl, { params: queryParams });
    }

    public getStudent(id: string): Observable<Student> {
        return this.http.get<Student>(this.studentUrl + `${id}`);
    }

    public updateStudent(id: string, student: Student): Observable<Student> {
        return this.http.put<Student>(this.studentUrl + `${id}`, student);
    }

    public deleteStudent(id: string) {
        return this.http.delete(this.studentUrl + `${id}`);
    }

    public getMarksByStudent(id: string, pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                                .append("pageNo", pageNo)
                                .append("pageSize", pageSize);
        return this.http.get<any>(this.studentUrl + `${id}/marks`, { params: queryParams });
    }

    public getRemarksByStudent(id: string, pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                                .append("pageNo", pageNo)
                                .append("pageSize", pageSize);
        return this.http.get<any>(this.studentUrl + `${id}/remarks`, { params: queryParams });
    }

    public getAbsencesByStudent(id: string, pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                                .append("pageNo", pageNo)
                                .append("pageSize", pageSize);
        return this.http.get<any>(this.studentUrl + `${id}/absences`, { params: queryParams });
    }

    public getParents(id: string, pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                                .append("pageNo", pageNo)
                                .append("pageSize", pageSize);
        return this.http.get<any>(this.studentUrl + `${id}/parents`, { params: queryParams });
    }

    public getMarksList(id: string): Observable<Mark[]> {
        return this.http.get<Mark[]>(this.studentUrl + `${id}/marksList`);
    }
}
