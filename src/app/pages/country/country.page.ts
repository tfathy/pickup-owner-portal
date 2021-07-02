import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { CategoryModel } from '../category/category-model';
import { CountryModel } from './country-model';
import { CountryService } from './country.service';
import { CountryComponent } from './country/country.component';

const ELEMENT_DATA: CountryModel[] = [];

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit ,AfterViewInit{
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  empName: string;
  authToken: authToken;
  displayedColumns: string[] = ['id','code', 'nameEn', 'nameAr', 'activeFlag', 'edit'];
  dataSource = new MatTableDataSource<CategoryModel>(ELEMENT_DATA);
  selection = new SelectionModel<CountryModel>(false, []);

  constructor( private modalCtrl: ModalController,
    private service: CountryService,
    private loadingCtrl: LoadingController,
    private toast: ToastController) { }

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
            console.log(data);
            this.dataSource.data = data;
            loadingElmnt.dismiss();
          },error=>{
            loadingElmnt.dismiss();
            console.log(error);
          });
        });
    }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
  create(){
    const body = new CountryModel();
    body.activeFlag = 'Y';
    this.modalCtrl.create({
      component: CountryComponent,
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

  editRow(body: CountryModel) {
    this.modalCtrl.create({
      component: CountryComponent,
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
      this.dataSource.data = data as CountryModel[];
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
