import { SysOwnerModel } from 'src/app/pages/profile/sys-owner-model';
import { SubscriptionRequestModel } from 'src/app/pages/sub-request/sub-request-model';


export class SpModel{
  constructor(
    public sysOwner: SysOwnerModel,
    public id?: number,
    public accountStatus?: string,
    public descAr?: string,
    public descEn?: string,
    public orderVatPrcnt?: number,
    public subscribtionRequest?: SubscriptionRequestModel
  ){}
}
