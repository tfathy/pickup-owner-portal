import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { EmployeeModel } from '../employee/employee-model';
import { EmployeeService } from '../employee/employee.service';
import { SysOwnerUserModel } from './sys-owner-users-model';
import { UsersService } from './users.service';
import { UsersComponent } from './users/users.component';
const ELEMENT_DATA: SysOwnerUserModel[]=[];
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  employeeList: EmployeeModel[] =[];
  empName: string;
  authToken: authToken;
  displayedColumns: string[] = ['email', 'accountStatus', 'userType', 'fullNameAr','fullNameEn', 'edit'];
  dataSource = new MatTableDataSource<SysOwnerUserModel>(ELEMENT_DATA);
  selection = new SelectionModel<SysOwnerUserModel>(false, []);
  constructor( private modalCtrl: ModalController,
    private service: UsersService,
    private empService: EmployeeService,
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
          this.service.findAll('Bearer ' + this.authToken.token).subscribe(
            (data) => {
              console.log(data);
              this.dataSource.data = data;
              this.empService.findAll('Bearer ' + this.authToken.token)
              .subscribe(empdata=>{
                this.employeeList = empdata;
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
    public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    };

    editRow(body: SysOwnerUserModel) {
      this.modalCtrl
        .create({
          component: UsersComponent,
          componentProps: { model: body,  empList: this.employeeList,recordStatus: 'update' },
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
        this.dataSource.data = data as SysOwnerUserModel[];
      });
    }
    create() {
      const body = new SysOwnerUserModel();
      body.accountStatus = 'NOT_VERIFIED';
      body.userType = 'SYS_OWNER';
      this.modalCtrl
        .create({
          component: UsersComponent,
          componentProps: { model: body,
            empList: this.employeeList
            , recordStatus: 'insert' },
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
