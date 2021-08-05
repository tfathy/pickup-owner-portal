import { SpModel } from 'src/app/shared/model/sp-model';
import { EmployeeModel } from '../employee/employee-model';
export class CreateUserModel {
  constructor(
    public hrEmployee?: EmployeeModel,
    public sp?: SpModel,
    public email?: string,
    public password?: string,
    public userType?: string,
    public accountStatus?: string
  ) {}
}
