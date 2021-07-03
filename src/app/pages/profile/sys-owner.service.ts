/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SysOwnerModel } from './sys-owner-model';

@Injectable({
  providedIn: 'root'
})
export class SysOwnerService {
  url = 'sys-owner-app/profile';
  constructor(private http: HttpClient) { }

  findById(token: string, id): Observable<SysOwnerModel> {
    const headerInfo = new HttpHeaders({ Authorization: token });
    return this.http.get<SysOwnerModel>(
      `${environment.backendUrl}/${this.url}/${id}`,{headers: headerInfo}
    );
  }
  update(token: string, body: SysOwnerModel, id) {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<SysOwnerModel>(
      `${environment.backendUrl}/${this.url}/${id}`,
      body,
      { headers: headerInfo }
    );
  }

}
