import { CountryModel } from '../country/country-model';

export class SysOwnerModel{
  constructor(public id?: number,
    public code?: string,
    public descAr?: string,
    public descEn?: string,
    public shortNameAr?: string,
    public shortNameEn?: string,
    public address?: string,
    public notes?: string,
    public gnCountry?: CountryModel
    ){}
}
