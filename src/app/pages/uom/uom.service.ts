/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UomModel } from './uom-model';

@Injectable({
  providedIn: 'root'
})
export class UomService {

  constructor(private http: HttpClient) { }

  findAll(token: string): Observable<UomModel[]> {
    const headerInfo = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: token,
    });

    return this.http.get<UomModel[]>(
      `${environment.backendUrl}/sys-owner-app/def/uom`,
      { headers: headerInfo }
    );
  }

  findById(token: string, id): Observable<UomModel> {
    const headerInfo = new HttpHeaders({ Authorization: token });
    return this.http.get<UomModel>(
      `${environment.backendUrl}/sys-owner-app/def/item-category/${id}`
    );
  }

  create(
    token: string,
    body: UomModel
  ): Observable<UomModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<UomModel>(
      `${environment.backendUrl}/sys-owner-app/def/uom`,
      body,
      { headers: headerInfo }
    );
  }

  update(token: string, body: UomModel, id) {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<UomModel>(
      `${environment.backendUrl}/sys-owner-app/def/uom/${id}`,
      body,
      { headers: headerInfo }
    );
  }

  delete(token: string, id): Observable<string> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.delete<string>(
      `${environment.backendUrl}/sys-owner-app/def/uom/${id}`,
      {
        headers: headerInfo,
      }
    );
  }
}
