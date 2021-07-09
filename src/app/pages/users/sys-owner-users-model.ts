import { WhoColumns } from 'src/app/shared/model/who-columns';
import { EmployeeModel } from '../employee/employee-model';

export class SysOwnerUserModel {
  constructor(
    public id?: number,
    public hrEmployee?: EmployeeModel,
    public email?: string,
    public encryptedPassword?: string,
    public userType?: string,
    public accountStatus?: string,
    public whoColumn?: WhoColumns
  ) {}
}
