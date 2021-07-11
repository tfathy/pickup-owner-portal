import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { SubscriptionRequestModel } from './sub-request-model';
import { SubRequestService } from './sub-request.service';
import { SubRequestComponent } from './sub-request/sub-request.component';
const ELEMENT_DATA: SubscriptionRequestModel[] = [];
@Component({
  selector: 'app-sub-request',
  templateUrl: './sub-request.page.html',
  styleUrls: ['./sub-request.page.scss'],
})
export class SubRequestPage implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  empName: string;
  authToken: authToken;
  displayedColumns: string[] = [
    'id',
    'reqDate',
    'status',
    'reqSerial',
    'address',
    'companyNameAr',
    'companyNameEn',
    'contactPersonName',
    'view',
  ];
  dataSource = new MatTableDataSource<SubscriptionRequestModel>(ELEMENT_DATA);
  selection = new SelectionModel<SubscriptionRequestModel>(false, []);
  constructor( private modalCtrl: ModalController,
    private service: SubRequestService,
    private loadingCtrl: LoadingController,
    private toast: ToastController) {}

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

    viewRow(body: SubscriptionRequestModel) {
      this.modalCtrl
        .create({
          component: SubRequestComponent,
          componentProps: { model: body },
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
        this.dataSource.data = data as SubscriptionRequestModel[];
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
