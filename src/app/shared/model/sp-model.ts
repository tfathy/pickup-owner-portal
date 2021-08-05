

export class SpModel {
  constructor(
    public ownerId: number,
    public id?: number,
    public accountStatus?: string,
    public descAr?: string,
    public descEn?: string,
    public orderVatPrcnt?: number,
    public subscriptionRequestId?: number,
    public companyNameAr?: string,
    public companyNameEn?: string,
    public contactPersonNameAr?: string,
    public contactPersonNameEn?: string,
    public contactPersonEmail?: string,
    public commNumber?: string,
    public address?: string
  ) {}
}
