import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ModalController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { CategoryModel } from '../category/category-model';
import { CategoryService } from '../category/category.service';
import { ItemModel } from '../items/item-model';
import { ItemsService } from '../items/items.service';
import { ServiceModel } from '../services/service-model';
import { ServiceService } from '../services/service.service';
import { ItemServService } from './item-serv.service';
import { ItemServiceModel } from './item-service-model';
import { ItemServiceComponent } from './item-service/item-service.component';
const ELEMENT_DATA: ItemServiceModel[] = [];
@Component({
  selector: 'app-item-service',
  templateUrl: './item-service.page.html',
  styleUrls: ['./item-service.page.scss'],
})
export class ItemServicePage implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  itemList: ItemModel[] = [];
  empName: string;
  authToken: authToken;
  displayedColumns: string[] = ['id', 'descEn', 'descAr', 'activeFlag', 'edit'];
  dataSource = new MatTableDataSource<ItemServiceModel>(ELEMENT_DATA);
  selection = new SelectionModel<ItemServiceModel>(false, []);
  categoryList: CategoryModel[] = [];
  selectedCategory: CategoryModel;
  currentItem;
  itemName: string;
  itemSelected;
  serviceList: ServiceModel[] = [];

  constructor(
    private modalCtrl: ModalController,
    private service: ItemsService,
    private itemServiceService: ItemServService,
    private servDef: ServiceService,
    private catService: CategoryService,
    private loadingCtrl: LoadingController,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.loadingCtrl
      .create({
        message: 'featching data',
      })
      .then(async (loadingElmnt) => {
        loadingElmnt.present();
        this.authToken = await readStorage('authData');
        this.empName = this.authToken.fullnameEn;
        this.service.findAll('Bearer ' + this.authToken.token).subscribe(
          (data) => {
            this.itemList = data;
            this.servDef
              .findAll('Bearer ' + this.authToken.token)
              .subscribe((servData) => {
                this.serviceList = servData;
              });
            this.catService
              .findAll('Bearer ' + this.authToken.token)
              .subscribe((category) => {
                this.categoryList = category;
              });
            loadingElmnt.dismiss();
          },
          (error) => {
            loadingElmnt.dismiss();
            console.log(error);
          }
        );
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
  doRefresh(itemId) {
    this.itemServiceService
      .findByItemId('Bearer ' + this.authToken.token, itemId)
      .subscribe((data) => {
        console.log(data);
        this.dataSource.data = data;
      });
  }

  onItemClick(item: ItemModel) {
    /*  const itemServiceList = item.gnItemService.filter(
      (p) => p.itemId === item.id
    );*/
    this.itemServiceService
      .findByItemId('Bearer ' + this.authToken.token, item.id)
      .subscribe((data) => {
        console.log(data);
        this.dataSource.data = data;
      });
    //  this.dataSource.data = itemServiceList;

    if (this.isSelected(item)) {
      this.itemSelected = null;
    } else {
      this.itemSelected = item;
      this.itemName = item.descAr;
    }
  }

  editRow(body: ItemServiceModel) {
    this.modalCtrl
      .create({
        component: ItemServiceComponent,
        componentProps: {
          model: body,
          title: this.itemName,
          serviceDefList: this.serviceList,
          recordStatus: 'update',
        },
        cssClass: 'modal-class',
      })
      .then((modalElement) => {
        modalElement.present();
        modalElement.onDidDismiss().then((dismissedData) => {
          if (dismissedData.data.saved) {
            this.doRefresh(dismissedData.data.itemId);
            this.showToast('Transaction Saved');
          }
        });
      });
  }
  onCatChange() {
    console.log(this.selectedCategory);
    this.loadingCtrl
      .create({
        message: 'filtering data ...',
      })
      .then((loadingElmnt) => {
        loadingElmnt.present();
        this.service
          .findItemByCatId(
            'Bearer ' + this.authToken.token,
            this.selectedCategory.id
          )
          .subscribe((resData) => {
            this.itemList = resData;
            loadingElmnt.dismiss();
          },error=>{
            loadingElmnt.dismiss();
          });
      });
  }
  addService(body: ItemModel) {
    console.log(body.id);
    const itemService = new ItemServiceModel(
      null,
      'Y',
      body.id,
      new ServiceModel(),
      null
    );
    this.modalCtrl
      .create({
        component: ItemServiceComponent,
        componentProps: {
          model: itemService,
          title: this.itemName,
          serviceDefList: this.serviceList,
          recordStatus: 'insert',
        },
        cssClass: 'modal-class',
      })
      .then((modalElement) => {
        modalElement.present();
        modalElement.onDidDismiss().then((dismissedData) => {
          if (dismissedData.data.saved) {
            this.doRefresh(dismissedData.data.itemId);
            this.showToast('Transaction Saved');
          }
        });
      });
  }

  isSelected(itm) {
    return this.itemSelected === itm; // the track that you selected
  }

  private showToast(msg: string) {
    this.toast
      .create({
        message: msg,
        position: 'middle',
        duration: 500,
      })
      .then((toastCtrl) => {
        toastCtrl.present();
      });
  }
}
