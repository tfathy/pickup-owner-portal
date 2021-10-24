/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubScriptionReqAttachmentsModel } from 'src/app/shared/model/sub-request-attachments-model';
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
  //new
  findAllNew(token: string): Observable<SubscriptionRequestModel[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<SubscriptionRequestModel[]>(
      `${environment.backendUrl}/${this.url}/new`,
      { headers: headerInfo }
    );
  }

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

  deleteRequest(token: string, id): Observable<string> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.delete<string>(
      `${environment.backendUrl}/${this.url}/${id}/${id}`,
      { headers: headerInfo }
    );
  }

  viewAttachments(
    token: string,
    subRequestId: number
  ): Observable<SubScriptionReqAttachmentsModel[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<SubScriptionReqAttachmentsModel[]>(
      `${environment.backendUrl}/sys-owner-app/public/sub-request-attach/${subRequestId}`,
      { headers: headerInfo }
    );
  }
}
