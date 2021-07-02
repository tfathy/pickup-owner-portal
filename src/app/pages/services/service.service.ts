/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceModel } from './service-model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  url = 'sys-owner-app/def/service';
  constructor(private http: HttpClient) {}

  findAll(token: string): Observable<ServiceModel[]> {
    const headerInfo = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: token,
    });

    return this.http.get<ServiceModel[]>(
      `${environment.backendUrl}/${this.url}`,
      { headers: headerInfo }
    );
  }

  findById(token: string, id): Observable<ServiceModel> {
    const headerInfo = new HttpHeaders({ Authorization: token });
    return this.http.get<ServiceModel>(
      `${environment.backendUrl}/${this.url}/${id}`
    );
  }

  create(token: string, body: ServiceModel): Observable<ServiceModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<ServiceModel>(
      `${environment.backendUrl}/${this.url}`,
      body,
      { headers: headerInfo }
    );
  }

  update(token: string, body: ServiceModel, id) {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<ServiceModel>(
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
