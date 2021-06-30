/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModel } from './category-model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  findAll(token: string): Observable<CategoryModel[]> {
    const headerInfo = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: token,
    });

    return this.http.get<CategoryModel[]>(
      `${environment.backendUrl}/sys-owner-app/def/item-category`,
      { headers: headerInfo }
    );
  }

  findById(token: string, id): Observable<CategoryModel> {
    const headerInfo = new HttpHeaders({ Authorization: token });
    return this.http.get<CategoryModel>(
      `${environment.backendUrl}/sys-owner-app/def/item-category/${id}`
    );
  }

  create(
    token: string,
    body: CategoryModel
  ): Observable<CategoryModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<CategoryModel>(
      `${environment.backendUrl}/sys-owner-app/def/item-category`,
      body,
      { headers: headerInfo }
    );
  }

  update(token: string, body: CategoryModel, id) {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<CategoryModel>(
      `${environment.backendUrl}/sys-owner-app/def/item-category/${id}`,
      body,
      { headers: headerInfo }
    );
  }

  delete(token: string, id): Observable<string> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.delete<string>(
      `${environment.backendUrl}/sys-owner-app/def/item-category/${id}`,
      {
        headers: headerInfo,
      }
    );
  }
}
