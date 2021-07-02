import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { VclTypeModel } from './vcl-type-model';
import { VclTypeService } from './vcl-type.service';
import { VclTypeComponent } from './vcl-type/vcl-type.component';

const ELEMENT_DATA: VclTypeModel[] = [];
@Component({
  selector: 'app-vcl-type',
  templateUrl: './vcl-type.page.html',
  styleUrls: ['./vcl-type.page.scss'],
})
export class VclTypePage implements OnInit,AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  empName: string;
  authToken: authToken;
  displayedColumns: string[] = ['id', 'descEn', 'descAr', 'activeFlag', 'edit'];
  dataSource = new MatTableDataSource<VclTypeModel>(ELEMENT_DATA);
  selection = new SelectionModel<VclTypeModel>(false, []);
  constructor(
    private modalCtrl: ModalController,
    private service: VclTypeService,
    private loadingCtrl: LoadingController,
    private toast: ToastController
  ) {}

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
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
  create() {
    const body = new VclTypeModel();
    body.activeFlag = 'Y';
    this.modalCtrl
      .create({
        component: VclTypeComponent,
        componentProps: { model: body, recordStatus: 'insert' },
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

  editRow(body: VclTypeModel) {
    this.modalCtrl
      .create({
        component: VclTypeComponent,
        componentProps: { model: body, recordStatus: 'update' },
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
      this.dataSource.data = data as VclTypeModel[];
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
