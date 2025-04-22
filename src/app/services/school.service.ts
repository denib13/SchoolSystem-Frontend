import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../models/school';
import { Teacher } from '../models/teacher';

@Injectable()
export class SchoolService {
    private schoolUrl: string;
    
    constructor(private http: HttpClient) { 
        this.schoolUrl = 'http://localhost:8080/api/schools/';
    }

    public createSchool(school: any): Observable<School> {
        return this.http.post<School>(this.schoolUrl, school);
    }

    public getSchools(pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams().append("pageNo", pageNo)
                                        .append("pageSize", pageSize);
        return this.http.get<any>(this.schoolUrl, { params: queryParams });
    }

    public getSchool(id: string): Observable<School> {
        return this.http.get<School>(this.schoolUrl + `${id}`);
    }

    public updateSchool(id: string, school: any):Observable<School> {
        return this.http.put<School>(this.schoolUrl + `${id}`, school);
    }

    public deleteSchool(id: string) {
        return this.http.delete(this.schoolUrl + `${id}`);
    }

    public getGradesBySchool(id: string, pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                                .append("pageNo", pageNo)
                                .append("pageSize", pageSize);
        return this.http.get<any>(this.schoolUrl + `${id}/grades`, { params: queryParams });
    }

    public getTeachersBySchool(id: string): Observable<any> {
        return this.http.get<any>(this.schoolUrl + `${id}/teachers`);
    }
}
