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
import { SysOwnerModel } from '../profile/sys-owner-model';
import { EmployeeModel } from './employee-model';
import { EmployeeService } from './employee.service';
import { EmployeeComponent } from './employee/employee.component';
const ELEMENT_DATA: EmployeeModel[] = [];
@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  empName: string;
  authToken: authToken;
  displayedColumns: string[] = [
    'id',
    'fullNameEn',
    'fullNameAr',
    'delete',
    'edit',
  ];
  dataSource = new MatTableDataSource<EmployeeModel>(ELEMENT_DATA);
  selection = new SelectionModel<EmployeeModel>(false, []);
  constructor(
    private modalCtrl: ModalController,
    private service: EmployeeService,
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
    const body = new EmployeeModel();
    const owner = new SysOwnerModel(1);
    body.sysOwner = owner;
    this.modalCtrl
      .create({
        component: EmployeeComponent,
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

  editRow(body: EmployeeModel) {
    this.modalCtrl
      .create({
        component: EmployeeComponent,
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
  deleteRow(body: EmployeeModel) {
    this.loadingCtrl
      .create({
        message: ' Deleting row...',
      })
      .then((loadingElmnt) => {
        loadingElmnt.present();
        this.service
          .delete('Bearer ' + this.authToken.token, body.id)
          .subscribe(
            (data) => {
              loadingElmnt.dismiss();
              this.doRefresh();
            },
            (error) => {
              loadingElmnt.dismiss();
            }
          );
      });
  }
  doRefresh() {
    this.service.findAll('Bearer ' + this.authToken.token).subscribe((data) => {
      console.log(data);
      this.dataSource.data = data as EmployeeModel[];
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
