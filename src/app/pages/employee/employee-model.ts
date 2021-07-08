import { WhoColumns } from 'src/app/shared/model/who-columns';
import { SysOwnerModel } from '../profile/sys-owner-model';

export class EmployeeModel {
  constructor(
    public id?: number,
    public fullNameAr?: string,
    public fullNameEn?: string,
    public notes?: string,
    public sysOwner?: SysOwnerModel,
    public whoColumn?: WhoColumns
  ) {}
}
