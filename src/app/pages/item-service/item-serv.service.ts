/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemServiceModel } from './item-service-model';

@Injectable({
  providedIn: 'root',
})
export class ItemServService {
  url = 'sys-owner-app/def/item-service';
  constructor(private http: HttpClient) {}
  findAll(token: string): Observable<ItemServiceModel[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<ItemServiceModel[]>(
      `${environment.backendUrl}/${this.url}`,
      { headers: headerInfo }
    );
  }

  findById(token: string, id): Observable<ItemServiceModel> {
    const headerInfo = new HttpHeaders({ Authorization: token });
    return this.http.get<ItemServiceModel>(
      `${environment.backendUrl}/${this.url}/${id}`,
      { headers: headerInfo }
    );
  }

  create(token: string, body: ItemServiceModel): Observable<ItemServiceModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<ItemServiceModel>(
      `${environment.backendUrl}/${this.url}`,
      body,
      { headers: headerInfo }
    );
  }

  update(token: string, body: ItemServiceModel, id) {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<ItemServiceModel>(
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
