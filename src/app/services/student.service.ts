import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

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
}
