import { EmployeeModel } from '../employee/employee-model';
export class CreateUserModel {
  constructor(
    public hrEmployee?: EmployeeModel,
    public email?: string,
    public password?: string,
    public userType?: string,
    public accountStatus?: string
  ) {}
}
