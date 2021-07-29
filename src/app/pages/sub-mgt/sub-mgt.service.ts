/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpModel } from 'src/app/shared/model/sp-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubMgtService {
  sysOwnerUrl = 'sys-owner-app/trx/sp';
  constructor(private http: HttpClient) {}

  findAll(token: string): Observable<SpModel[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<SpModel[]>(
      `${environment.backendUrl}/${this.sysOwnerUrl}`,
      { headers: headerInfo }
    );
  }

  findById(token: string, id): Observable<SpModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<SpModel>(
      `${environment.backendUrl}/${this.sysOwnerUrl}/${id}`,
      { headers: headerInfo }
    );
  }

  createSp(token: string, body: SpModel): Observable<SpModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<SpModel>(
      `${environment.backendUrl}/${this.sysOwnerUrl}`,
      body,
      { headers: headerInfo }
    );
  }

  updateSp(token: string, body: SpModel,id): Observable<SpModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<SpModel>(
      `${environment.backendUrl}/${this.sysOwnerUrl}/${id}`,
      body,
      { headers: headerInfo }
    );
  }

}
