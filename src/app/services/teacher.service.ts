import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../models/teacher';
import { Observable } from 'rxjs';

@Injectable()
export class TeacherService {
    private teacherUrl: string;
    
    constructor(private http: HttpClient) {
        this.teacherUrl = 'http://localhost:8080/api/teachers/';
    }

    public getTeachers(pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                            .append("pageNo", pageNo)
                            .append("pageSize", pageSize);
        return this.http.get<any>(this.teacherUrl, { params: queryParams });
    }

    public getTeacher(id: string): Observable<Teacher> {
        return this.http.get<Teacher>(this.teacherUrl + `${id}`);
    }

    public updateTeacher(id: string, teacher: Teacher): Observable<Teacher> {
        return this.http.put<Teacher>(this.teacherUrl + `${id}`, teacher);
    }

    public deleteTeacher(id: string) {
        return this.http.delete(this.teacherUrl + `${id}`);
    }
}
