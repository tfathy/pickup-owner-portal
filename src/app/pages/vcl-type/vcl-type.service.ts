/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VclTypeModel } from './vcl-type-model';

@Injectable({
  providedIn: 'root',
})
export class VclTypeService {
  url = 'sys-owner-app/def/vehicle-size';
  constructor(private http: HttpClient) {}

  findAll(token: string): Observable<VclTypeModel[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<VclTypeModel[]>(
      `${environment.backendUrl}/${this.url}`,{headers:headerInfo}
    );
  }
  findById(token: string, id): Observable<VclTypeModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<VclTypeModel>(
      `${environment.backendUrl}/${this.url}/${{ id }}`,
      { headers: headerInfo }
    );
  }

  create(token: string, body: VclTypeModel): Observable<VclTypeModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<VclTypeModel>(
      `${environment.backendUrl}/${this.url}`,
      body,
      { headers: headerInfo }
    );
  }
  update(token: string, body: VclTypeModel, id): Observable<VclTypeModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<VclTypeModel>(
      `${environment.backendUrl}/${this.url}/${id}`,
      body,
      { headers: headerInfo }
    );
  }
  delet(token: string, id): Observable<string> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.delete<string>(
      `${environment.backendUrl}/${this.url}/${id}`,
      { headers: headerInfo }
    );
  }
}
