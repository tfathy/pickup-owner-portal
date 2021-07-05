/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../category/category-model';
import { ItemModel } from './item-model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  url = 'sys-owner-app/def/item';

  constructor(private http: HttpClient) {}
  findAll(token: string): Observable<ItemModel[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<ItemModel[]>(
      `${environment.backendUrl}/${this.url}`,
      { headers: headerInfo }
    );
  }

  findById(token: string, id): Observable<ItemModel> {
    const headerInfo = new HttpHeaders({ Authorization: token });
    return this.http.get<ItemModel>(
      `${environment.backendUrl}/${this.url}/${id}`,{headers: headerInfo}
    );
  }
  create(
    token: string,
    body: ItemModel
  ): Observable<ItemModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<ItemModel>(
      `${environment.backendUrl}/${this.url}`,
      body,
      { headers: headerInfo }
    );
  }

  update(token: string, body: ItemModel, id) {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<ItemModel>(
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
