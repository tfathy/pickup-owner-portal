import { WhoColumns } from 'src/app/shared/model/who-columns';
import { ItemModel } from '../items/item-model';
import { ServiceModel } from '../services/service-model';

export class ItemServiceModel {
  constructor(
    public id?: number,
    public activeFlag?: string,
    public gnItem?: ItemModel,
    public gnService?: ServiceModel,
    public whoColumn?: WhoColumns
  ) {}
}
