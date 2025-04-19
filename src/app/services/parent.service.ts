import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parent } from '../models/parent';

@Injectable()
export class ParentService {
    private parentUrl: string;

    constructor(private http: HttpClient) {
        this.parentUrl = 'http://localhost:8080/api/parents/';
    }

    public getParents(pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                                .append("pageNo", pageNo)
                                .append("pageSize", pageSize);
        return this.http.get<any>(this.parentUrl, { params: queryParams });
    }

    public getParent(id: string): Observable<Parent> {
        return this.http.get<Parent>(this.parentUrl + `${id}`);
    }

    public updateParent(id: string, parent: Parent): Observable<Parent> {
        return this.http.put<Parent>(this.parentUrl + `${id}`, parent);
    }

    public deleteParent(id: string) {
        return this.http.delete(this.parentUrl + `${id}`);
    }
}
