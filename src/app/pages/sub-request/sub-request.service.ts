/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubscriptionRequestModel } from './sub-request-model';

@Injectable({
  providedIn: 'root',
})
export class SubRequestService {
  url = 'sys-owner-app/trx/sub-request';
  constructor(private http: HttpClient) {}

  findAll(token: string): Observable<SubscriptionRequestModel[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<SubscriptionRequestModel[]>(
      `${environment.backendUrl}/${this.url}`,
      { headers: headerInfo }
    );
  }
/// add method find  n=only new subscription requests (Status=E or R)
  updateStatus(
    token: string,
    model: SubscriptionRequestModel,
    id
  ): Observable<SubscriptionRequestModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<SubscriptionRequestModel>(
      `${environment.backendUrl}/${this.url}/${id}`,
      model,
      { headers: headerInfo }
    );
  }
}
