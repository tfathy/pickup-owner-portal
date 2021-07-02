export class CurrencyModel {
  constructor(
    public id?: number,
    public code?: string,
    public curSymbol?: string,
    public decimilPoint?: number,
    public nameAr?: string,
    public nameEn?: string,
    public activeFlag?: string
  ) {}
}
