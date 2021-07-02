/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PayMethodModel } from './pay-method-model';

@Injectable({
  providedIn: 'root',
})
export class PayMethodService {
  url = 'sys-owner-app/def/pay-method';

  constructor(private http: HttpClient) {}
  findAll(token: string): Observable<PayMethodModel[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<PayMethodModel[]>(
      `${environment.backendUrl}/${this.url}`,
      { headers: headerInfo }
    );
  }

  findById(token: string, id): Observable<PayMethodModel> {
    const headerInfo = new HttpHeaders({ Authorization: token });
    return this.http.get<PayMethodModel>(
      `${environment.backendUrl}/${this.update}/${id}`
    );
  }

  create(
    token: string,
    body: PayMethodModel
  ): Observable<PayMethodModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<PayMethodModel>(
      `${environment.backendUrl}/${this.url}`,
      body,
      { headers: headerInfo }
    );
  }

  update(token: string, body: PayMethodModel, id) {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<PayMethodModel>(
      `${environment.backendUrl}/${this.url}/${id}`,
      body,
      { headers: headerInfo }
    );
  }

  delete(token: string, id): Observable<string> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.delete<string>(
      `${environment.backendUrl}/${this.url}/${id}`,
      {
        headers: headerInfo,
      }
    );
  }

}
