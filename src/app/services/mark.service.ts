import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mark } from '../models/mark';

@Injectable()
export class MarkService {
    private markUrl: string;
    
    constructor(private http: HttpClient) {
        this.markUrl = 'http://localhost:8080/api/marks/';
    }

    public createMark(mark: any): Observable<Mark> {
        return this.http.post<Mark>(this.markUrl, mark);
    }

    public getMark(id: string): Observable<Mark> {
        return this.http.get<Mark>(this.markUrl + `${id}`);
    }

    public getMarks(pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                                    .append("pageNo", pageNo)
                                    .append("pageSize", pageSize);
        return this.http.get<any>(this.markUrl, { params: queryParams });
    }

    public updateMark(id: string, mark: Mark): Observable<Mark> {
        return this.http.put<Mark>(this.markUrl + `${id}`, mark);
    }

    public deleteMark(id: string) {
        return this.http.delete(this.markUrl + `${id}`);
    }
}
