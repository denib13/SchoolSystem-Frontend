import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Remark } from '../models/remark';
import { Observable } from 'rxjs';

@Injectable()
export class RemarkService {
    private remarkUrl: string; 

    constructor(private http: HttpClient) { 
        this.remarkUrl = 'http://localhost:8080/api/remarks/';
    }

    public createRemark(remark: any): Observable<Remark> {
        return this.http.post<Remark>(this.remarkUrl, remark);
    }

    public getRemark(id: string): Observable<Remark> {
        return this.http.get<Remark>(this.remarkUrl + `${id}`);
    }

    public getRemarks(pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                                    .append("pageNo", pageNo)
                                    .append("pageSize", pageSize);
        return this.http.get<any>(this.remarkUrl, { params: queryParams });
    }

    public updateRemark(id: string, remark: Remark): Observable<Remark> {
        return this.http.put<Remark>(this.remarkUrl + `${id}`, remark);
    }

    public deleteRemark(id: string) {
        return this.http.delete(this.remarkUrl + `${id}`);
    }
}
