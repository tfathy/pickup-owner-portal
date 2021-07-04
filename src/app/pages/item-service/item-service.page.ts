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
import { ItemModel } from '../items/item-model';
import { ItemsService } from '../items/items.service';
import { ItemServiceModel } from './item-service-model';
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
  displayedColumns: string[] = [
    'id',
    'code',
    'descEn',
    'descAr',
    'activeFlag',
    'edit',
  ];
  dataSource = new MatTableDataSource<ItemServiceModel>(ELEMENT_DATA);
  selection = new SelectionModel<ItemServiceModel>(false, []);
  categoryList: CategoryModel[] = [];
  constructor(
    private modalCtrl: ModalController,
    private service: ItemsService,
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
            console.log(data);
            this.itemList = data;
             this.dataSource.data= data[0].gnItemService;
            loadingElmnt.dismiss();
          },
          (error) => {
            loadingElmnt.dismiss();
            console.log(error);
          }
        );
      });

    //this.dataSource.data = this.itemList[0].gnItemService;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
  doRefresh() {
    this.service.findAll('Bearer ' + this.authToken.token).subscribe((data) => {
      console.log(data);
      this.dataSource.data = data as ItemModel[];
    });
  }
  editRow(body: ItemModel) {
    /*   this.modalCtrl
        .create({
          component: ItemsComponent,
          componentProps: {
            model: body,
            recordStatus: 'update',
          },
          cssClass: 'modal-class',
        })
        .then((modalElement) => {
          modalElement.present();
          modalElement.onDidDismiss().then((dismissedData) => {
            if (dismissedData.data.saved) {
              this.doRefresh();
              this.showToast('Transaction Saved');
            }
          });
        });*/
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
