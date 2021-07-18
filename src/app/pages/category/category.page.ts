import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { CategoryModel } from './category-model';
import { CategoryService } from './category.service';
import { CategoryComponent } from './category/category.component';

import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA: CategoryModel[] = [];
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit ,AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  empName: string;
  authToken: authToken;
  displayedColumns: string[] = ['id', 'descEn', 'descAr', 'activeFlag', 'edit'];
  dataSource = new MatTableDataSource<CategoryModel>(ELEMENT_DATA);
  selection = new SelectionModel<CategoryModel>(false, []);

  constructor( private modalCtrl: ModalController,
    private service: CategoryService,
    private loadingCtrl: LoadingController,
    private toast: ToastController) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  async ngOnInit() {
    this.loadingCtrl
      .create({
        message: 'featching data',
      })
      .then(async (loadingElmnt) => {
        loadingElmnt.present();
        this.authToken = await readStorage('authData');
        this.empName = this.authToken.fullnameEn;
        this.service.findAll('Bearer ' + this.authToken.token).subscribe((data) => {

          this.dataSource.data = data;
          loadingElmnt.dismiss();
        },error=>{
          loadingElmnt.dismiss();
          console.log(error);
        });
      });
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
  create(){
    const body = new CategoryModel();
    body.activeFlag = 'Y';
    this.modalCtrl.create({
      component: CategoryComponent,
      componentProps:{model: body,recordStatus: 'insert'},
      cssClass: 'modal-class'
    }).then(modalElement=>{
      modalElement.present();
      modalElement.onDidDismiss().then(dismissedData=>{
        if(dismissedData.data.saved){
          this.doRefresh();
          this.showToast('Transaction Saved');
        }
      });
    });
  }

  editRow(body: CategoryModel) {
    this.modalCtrl.create({
      component: CategoryComponent,
      componentProps:{model: body,recordStatus: 'update'},
      cssClass: 'modal-class'
    }).then(modalElement=>{
      modalElement.present();
      modalElement.onDidDismiss().then(dismissedData=>{
        if(dismissedData.data.saved){
          this.doRefresh();
          this.showToast('Transaction Saved');
        }
      });
    });
  }
   doRefresh() {
    this.service.findAll('Bearer ' + this.authToken.token).subscribe((data) => {
      console.log(data);
      this.dataSource.data = data as CategoryModel[];
    });
  }

  private  showToast(msg: string) {
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
