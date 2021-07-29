/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { generatedRandomString } from 'src/app/shared/shared-util';
import { environment } from 'src/environments/environment';
import { CreateUserModel } from './create-user-model';
import { SysOwnerUserModel } from './sys-owner-users-model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'sys-owner-security/owner-auth';
  constructor(private http: HttpClient) {}

  findAll(token: string): Observable<SysOwnerUserModel[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<SysOwnerUserModel[]>(
      `${environment.backendUrl}/${this.url}`,
      { headers: headerInfo }
    );
  }

  createUser(
    token: string,
    body: CreateUserModel
  ): Observable<CreateUserModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    const tempPassword = generatedRandomString(4);
    body.password = tempPassword;
    return this.http.post<CreateUserModel>(
      `${environment.backendUrl}/${this.url}`,
      body,
      { headers: headerInfo }
    );
  }
  updateUser(
    token: string,
    body: CreateUserModel
  ): Observable<CreateUserModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<CreateUserModel>(
      `${environment.backendUrl}/${this.url}/update/${body.email}`,
      body,
      { headers: headerInfo }
    );
  }
}
