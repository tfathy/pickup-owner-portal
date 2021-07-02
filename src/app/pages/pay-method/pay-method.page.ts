import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { PayMethodModel } from './pay-method-model';
import { PayMethodService } from './pay-method.service';
import { PayMethodComponent } from './pay-method/pay-method.component';
const ELEMENT_DATA: PayMethodModel[] = [];
@Component({
  selector: 'app-pay-method',
  templateUrl: './pay-method.page.html',
  styleUrls: ['./pay-method.page.scss'],
})
export class PayMethodPage implements OnInit ,AfterViewInit{
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  empName: string;
  authToken: authToken;
  displayedColumns: string[] = ['id', 'descEn', 'descAr', 'activeFlag', 'edit'];
  dataSource = new MatTableDataSource<PayMethodModel>(ELEMENT_DATA);
  selection = new SelectionModel<PayMethodModel>(false, []);
  constructor(private modalCtrl: ModalController,
    private service: PayMethodService,
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
          console.log(data);
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
    const body = new PayMethodModel();
    body.activeFlag = 'Y';
    this.modalCtrl.create({
      component: PayMethodComponent,
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

  editRow(body: PayMethodModel) {
    this.modalCtrl.create({
      component: PayMethodComponent,
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
      this.dataSource.data = data as PayMethodModel[];
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
