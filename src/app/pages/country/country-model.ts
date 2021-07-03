import { WhoColumns } from 'src/app/shared/model/who-columns';

export class CountryModel {
  constructor(
    public id?: number,
    public code?: string,
    public nameAr?: string,
    public nameEn?: string,
    public activeFlag?: string,
    public whoColumns?: WhoColumns
  ) {}
}
