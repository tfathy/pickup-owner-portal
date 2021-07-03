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
import { UomModel } from '../uom/uom-model';
import { UomService } from '../uom/uom.service';
import { ItemModel } from './item-model';
import { ItemsService } from './items.service';
import { ItemsComponent } from './items/items.component';
const ELEMENT_DATA: ItemModel[] = [];
@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  empName: string;
  authToken: authToken;
  displayedColumns: string[] = [
    'id',
    'itemCode',
    'descEn',
    'descAr',
    'activeFlag',
    'gnItemCategory',
    'edit',
  ];
  dataSource = new MatTableDataSource<ItemModel>(ELEMENT_DATA);
  selection = new SelectionModel<ItemModel>(false, []);
  categoryList: CategoryModel[] = [];
  uomList: UomModel[] = [];
  constructor(
    private modalCtrl: ModalController,
    private service: ItemsService,
    private categoryService: CategoryService,
    private uomService: UomService,
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
        this.uomService
          .findAll('Bearer ' + this.authToken.token)
          .subscribe((data) => {
            this.uomList = data;
          });
        this.categoryService
          .findAll('Bearer ' + this.authToken.token)
          .subscribe((data) => {
            this.categoryList = data;
          });
        this.service.findAll('Bearer ' + this.authToken.token).subscribe(
          (data) => {
            console.log(data);
            this.dataSource.data = data;
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
  create() {
    const body = new ItemModel();
    body.activeFlag = 'Y';
    this.modalCtrl
      .create({
        component: ItemsComponent,
        componentProps: {
          model: body,
          category: this.categoryList,
          uom: this.uomList,
          recordStatus: 'insert',
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
      });
  }

  editRow(body: ItemModel) {
    this.modalCtrl
      .create({
        component: ItemsComponent,
        componentProps: {
          model: body,
          category: this.categoryList,
          uom: this.uomList,
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
      });
  }
  doRefresh() {
    this.service.findAll('Bearer ' + this.authToken.token).subscribe((data) => {
      console.log(data);
      this.dataSource.data = data as ItemModel[];
    });
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
