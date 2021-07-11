import { CountryModel } from '../country/country-model';
import { SysOwnerModel } from '../profile/sys-owner-model';

export class SubscriptionRequestModel {
  constructor(
    public id?: number,
    public reqDate?: Date,
    public reqSerial?: number,
    public reqYear?: number,
    public requesterType?: string,
    public status?: string,
    public sysOwner?: SysOwnerModel,
    public gnCountry?: CountryModel,
    public address?: string,
    public commNumber?: string,
    public companyNameAr?: string,
    public companyNameEn?: string,
    public contactPersonEmail?: string,
    public contactPersonName?: string,
    public contactPersonPhone?: string
  ) {}
}
