/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeModel } from './employee-model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url = 'sys-owner-app/def/employee';
  constructor(private http: HttpClient) {}
  findAll(token: string): Observable<EmployeeModel[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<EmployeeModel[]>(
      `${environment.backendUrl}/${this.url}`,
      { headers: headerInfo }
    );
  }

  findById(token: string, id): Observable<EmployeeModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<EmployeeModel>(
      `${environment.backendUrl}/${this.url}/${id}`,
      { headers: headerInfo }
    );
  }

  create(token: string, body: EmployeeModel): Observable<EmployeeModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<EmployeeModel>(
      `${environment.backendUrl}/${this.url}`,
      body,
      { headers: headerInfo }
    );
  }

  update(token: string, body: EmployeeModel, id): Observable<EmployeeModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<EmployeeModel>(
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
      { headers: headerInfo }
    );
  }
}
