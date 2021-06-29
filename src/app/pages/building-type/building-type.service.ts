/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BuildingTypeModel } from './building-type.model';

@Injectable({
  providedIn: 'root',
})
export class BuildingTypeService {
  constructor(private http: HttpClient) {}

  findAll(token: string): Observable<BuildingTypeModel[]> {
    const headerInfo = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: token,
    });

    return this.http.get<BuildingTypeModel[]>(
      `${environment.backendUrl}/sys-owner-app/def/location-type`,
      { headers: headerInfo }
    );
  }

  findById(token: string, id): Observable<BuildingTypeModel> {
    const headerInfo = new HttpHeaders({ Authorization: token });
    return this.http.get<BuildingTypeModel>(
      `${environment.backendUrl}/sys-owner-app/def/location-type/${id}`
    );
  }

  create(
    token: string,
    body: BuildingTypeModel
  ): Observable<BuildingTypeModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<BuildingTypeModel>(
      `${environment.backendUrl}/sys-owner-app/def/location-type`,
      body,
      { headers: headerInfo }
    );
  }

  update(token: string, body: BuildingTypeModel, id) {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<BuildingTypeModel>(
      `${environment.backendUrl}/sys-owner-app/def/location-type/${id}`,
      body,
      { headers: headerInfo }
    );
  }

  delete(token: string, id): Observable<string> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.delete<string>(
      `${environment.backendUrl}/sys-owner-app/def.location-type/${id}`,
      {
        headers: headerInfo,
      }
    );
  }
}
