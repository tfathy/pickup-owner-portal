import { WhoColumns } from '../../shared/model/who-columns';
import { CategoryModel } from '../category/category-model';
import { ItemServiceModel } from '../item-service/item-service-model';
import { UomModel } from '../uom/uom-model';

export class ItemModel{
constructor(
public id?: number,
public descAr?: string,
public descEn?: string,
public activeFlag?: string,
public gnItemCategory?: CategoryModel,
public gnuom?: UomModel,
public itemCode?: string,
public whoColumn?: WhoColumns,
public gnItemService?: ItemServiceModel[]
){}
}
