import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headmaster } from '../models/headmaster';

@Injectable()
export class HeadmasterService {
    private headmasterUrl: string;

    constructor(private http: HttpClient) { 
        this.headmasterUrl = 'http://localhost:8080/api/headmasters/';
    }

    public getHeadmasters(pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams().append("pageNo", pageNo)
                                        .append("pageSize", pageSize);
        return this.http.get<any>(this.headmasterUrl, { params: queryParams });
    }

    public getHeadmaster(id: string): Observable<Headmaster> {
        return this.http.get<Headmaster>(this.headmasterUrl + `${id}`);
    }

    public updateHeadmaster(id: string, headmaster: Headmaster): Observable<Headmaster> {
        return this.http.put<Headmaster>(this.headmasterUrl + `${id}`, headmaster);
    }

    public deleteHeadmaster(id: string) {
        return this.http.delete(this.headmasterUrl + `${id}`);
    }

    public getUnassignedHeadmasters(pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams().append("pageNo", pageNo)
                                        .append("pageSize", pageSize);
        return this.http.get<any>(this.headmasterUrl + `unassigned`, { params: queryParams });
    }
}
