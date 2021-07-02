/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrencyModel } from './currency-model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  findAll(token: string): Observable<CurrencyModel[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<CurrencyModel[]>(
      `${environment.backendUrl}/sys-owner-app/def/currency`,
      { headers: headerInfo }
    );
  }

  findById(token: string, id): Observable<CurrencyModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<CurrencyModel>(
      `${environment.backendUrl}/sys-owner-app/def/currency/${id}`,
      { headers: headerInfo }
    );
  }

  create(token: string, body: CurrencyModel): Observable<CurrencyModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<CurrencyModel>(
      `${environment.backendUrl}/sys-owner-app/def/currency`,
      body,
      { headers: headerInfo }
    );
  }

  update(token: string, body: CurrencyModel, id): Observable<CurrencyModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<CurrencyModel>(
      `${environment.backendUrl}/sys-owner-app/def/currency/${id}`,
      body,
      { headers: headerInfo }
    );
  }

  delete(token: string, id): Observable<string> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.delete<string>(
      `${environment.backendUrl}/sys-owner-app/def/currency/${id}`,
      { headers: headerInfo }
    );
  }
}
