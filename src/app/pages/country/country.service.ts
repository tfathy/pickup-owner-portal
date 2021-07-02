/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryModel } from './country-model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  findAll(token: string): Observable<CountryModel[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<CountryModel[]>(
      `${environment.backendUrl}/sys-owner-app/def/country`,
      { headers: headerInfo }
    );
  }

  findById(token: string, id): Observable<CountryModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<CountryModel>(
      `${environment.backendUrl}/sys-owner-app/def/country/${id}`,
      { headers: headerInfo }
    );
  }

  create(token: string, body: CountryModel): Observable<CountryModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<CountryModel>(
      `${environment.backendUrl}/sys-owner-app/def/country`,
      body,
      { headers: headerInfo }
    );
  }

  update(token: string, body: CountryModel, id): Observable<CountryModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });

    return this.http.put<CountryModel>(
      `${environment.backendUrl}/sys-owner-app/def/country/${id}`,
      body,
      { headers: headerInfo }
    );
  }

  delete(token: string, id): Observable<string> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.delete<string>(
      `${environment.backendUrl}/sys-owner-app/def/country/${id}`,
      { headers: headerInfo }
    );
  }
}
