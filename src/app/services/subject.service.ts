import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';

@Injectable()
export class SubjectService {
    private subjectUrl: string;

    constructor(private http: HttpClient) {
        this.subjectUrl = 'http://localhost:8080/api/subjects/';
    }

    public createSubject(subject: any): Observable<Subject> {
        return this.http.post<Subject>(this.subjectUrl, subject);
    }

    public getSubjects(pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                                .append("pageNo", pageNo)
                                .append("pageSize", pageSize);
        return this.http.get<any>(this.subjectUrl, { params: queryParams });
    }

    public getSubject(id: string): Observable<Subject> {
        return this.http.get<Subject>(this.subjectUrl + `${id}`);
    }

    public updateSubject(id: string, subject: any): Observable<Subject> {
        return this.http.put<Subject>(this.subjectUrl + `${id}`, subject);
    }

    public deleteSubject(id: string) {
        return this.http.delete(this.subjectUrl + `${id}`);
    }

    public getMarksBySubject(id: string, pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                                .append("pageNo", pageNo)
                                .append("pageSize", pageSize);
        return this.http.get<any>(this.subjectUrl + `${id}/marks`, { params: queryParams });
    }
}
