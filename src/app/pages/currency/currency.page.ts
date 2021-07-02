import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { CurrencyModel } from './currency-model';
import { CurrencyService } from './currency.service';
import { CurrencyComponent } from './currency/currency.component';
const ELEMENT_DATA: CurrencyModel[] = [];
@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
})
export class CurrencyPage implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  empName: string;
  authToken: authToken;
  displayedColumns: string[] = ['id','code', 'nameEn', 'nameAr', 'activeFlag', 'edit'];
  dataSource = new MatTableDataSource<CurrencyModel>(ELEMENT_DATA);
  selection = new SelectionModel<CurrencyModel>(false, []);
  constructor( private modalCtrl: ModalController,
    private service: CurrencyService,
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
    const body = new CurrencyModel();
    body.activeFlag = 'Y';
    this.modalCtrl.create({
      component: CurrencyComponent,
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

  editRow(body: CurrencyModel) {
    this.modalCtrl.create({
      component: CurrencyComponent,
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
      this.dataSource.data = data as CurrencyModel[];
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
