import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Absence } from '../models/absence';

@Injectable()
export class AbsenceService {
    private absenceUrl: string;

    constructor(private http: HttpClient) {
        this.absenceUrl = 'http://localhost:8080/api/absences/';
    }

    public createAbsence(absence: any): Observable<Absence> {
        return this.http.post<Absence>(this.absenceUrl, absence);
    }

    public getAbsence(id: string): Observable<Absence> {
        return this.http.get<Absence>(this.absenceUrl + `${id}`);
    }

    public getAbsences(pageNo: number, pageSize: number): Observable<any> {
        let queryParams = new HttpParams()
                                    .append("pageNo", pageNo)
                                    .append("pageSize", pageSize);
        return this.http.get<any>(this.absenceUrl, { params: queryParams });
    }

    public updateAbsence(id: string, absence: Absence): Observable<Absence> {
        return this.http.put<Absence>(this.absenceUrl + `${id}`, absence);
    }

    public deleteAbsence(id: string) {
        return this.http.delete(this.absenceUrl + `${id}`);
    }
}
