/* eslint-disable max-len */
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ModalController,
  LoadingController,
  ToastController,
  ActionSheetController,
  AlertController,
} from '@ionic/angular';
import { LoginPageService } from 'src/app/login/login-page.service';
import { SpModel } from 'src/app/shared/model/sp-model';
import { authToken, generatedRandomString, readStorage } from 'src/app/shared/shared-util';
import { SysOwnerModel } from '../profile/sys-owner-model';
import { CreateUserModel } from '../users/create-user-model';
import { UsersService } from '../users/users.service';
import { SpComponent } from './sp/sp.component';
import { SubMgtService } from './sub-mgt.service';
const ELEMENT_DATA: SpModel[] = [];
@Component({
  selector: 'app-sub-mgt',
  templateUrl: './sub-mgt.page.html',
  styleUrls: ['./sub-mgt.page.scss'],
})
export class SubMgtPage implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  empName: string;
  authToken: authToken;
  displayedColumns: string[] = [
    'id',
    'descEn',
    'descAr',
    'accountStatus',
    'edit',
    'manage',
  ];
  dataSource = new MatTableDataSource<SpModel>(ELEMENT_DATA);
  selection = new SelectionModel<SpModel>(false, []);
  selectedSp: SpModel;
  constructor(
    private modalCtrl: ModalController,
    private spService: SubMgtService,
    private userServices: UsersService,
    private loginPageService: LoginPageService,
    private loadingCtrl: LoadingController,
    private toast: ToastController,
    private alertCtrl: AlertController,
    private actionSheet: ActionSheetController
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
        this.spService.findAll('Bearer ' + this.authToken.token).subscribe(
          (data) => {

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
   // const owner = new SysOwnerModel(1);
    const body = new SpModel(1);
    body.accountStatus = 'NEW';
    this.modalCtrl
      .create({
        component: SpComponent,
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
  editRow(body: SpModel) {
    this.modalCtrl
      .create({
        component: SpComponent,
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

  async manageAccount(body: SpModel) {
    this.selectedSp = body;
    console.log('this.selectedSp = ');
    console.log(this.selectedSp);
    console.log('*****end ');
    let buttonsProps = [];

    const statusNewButtons = this.generateCreateNewAccountButtons();

    const statusEnabledButtons = this.generateUpdateEnabledAccountButtons(this.selectedSp);
    const statusDisabledButtons =
      this.generateUpdateDisabledAccountButtons(this.selectedSp);

    if (this.selectedSp.accountStatus === 'NEW') {
      buttonsProps = statusNewButtons;
    } else if (this.selectedSp.accountStatus === 'VALID') {
      buttonsProps = statusEnabledButtons;
    } else if (this.selectedSp.accountStatus === 'HOLD') {
      buttonsProps = statusDisabledButtons;
    }
    await this.actionSheet
      .create({
        cssClass: 'action-seet-class',
        buttons: buttonsProps,
      })
      .then((actionSheetElmnt) => {
        actionSheetElmnt.present();
      });
  }

  doRefresh() {
    this.spService
      .findAll('Bearer ' + this.authToken.token)
      .subscribe((data) => {
        this.dataSource.data = data as SpModel[];
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
  private getNewCreatedUser(): CreateUserModel {
    const tempPassword = generatedRandomString(4);
    const userModel = new CreateUserModel(null,this.selectedSp,this.selectedSp.contactPersonEmail,tempPassword,'SP','VERIFIED');
    return userModel;
  }
  private showAlert(msg: string) {
    this.alertCtrl
      .create({
        message: msg,
        buttons: ['OK'],
      })
      .then((alertElmnt) => {
        alertElmnt.present();
      });
  }
  private generateCreateNewAccountButtons() {
    const userModel: CreateUserModel = this.getNewCreatedUser();
    return [
      {
        text: 'Create User',
        icon: 'person-add-outline',
        handler: () => {
          // sigh up
          this.loadingCtrl
            .create({ message: 'Creating account... please wait' })
            .then((loadingElement) => {
              loadingElement.present();
              this.userServices
                .createUser('Bearer ' + this.authToken.token, userModel)
                .subscribe(
                  (userData) => {
                    this.selectedSp.accountStatus = 'VALID';
                    this.spService
                      .updateSp('Bearer ' + this.authToken.token, this.selectedSp, this.selectedSp.id)
                      .subscribe(
                        (spData) => {
                          loadingElement.dismiss();
                          this.showAlert(
                            'New Account created Successfully.Password is sent to email: ' +
                            this.selectedSp.contactPersonEmail
                          );

                        },
                        (error) => {
                          loadingElement.dismiss();
                          this.showAlert('Error while createing new User');
                        }
                      );
                  },
                  (error) => {
                    loadingElement.dismiss();
                    this.showToast('cannot create user');
                    console.log(error);
                  }
                );
            });
        },
      },
      { text: 'Cancel', icon: 'close', role: 'cancel' },
    ];
  }

  private generateUpdateEnabledAccountButtons(body: SpModel) {
    return [
      {
        text: 'Disable Account',
        icon: 'share',
        handler: () => {
          console.log('show model to enable user');
        },
      },
      {
        text: 'Rest Password',
        icon: 'close',
        handler: () => {
          console.log('rest password');
           // check if this username exists
    this.loadingCtrl
    .create({
      message: 'Checking your email address ... please wait',
    })
    .then((loadingElmnt) => {
      loadingElmnt.present();
      this.loginPageService.checkUserExists(body.contactPersonEmail).subscribe(
        (resData) => {
          //send new password
          this.showAlert(
            'A New password is sent.Please Check your email inbox'
          );
          loadingElmnt.dismiss();
        },
        (error) => {
          this.showAlert(error.message.statusText);
          loadingElmnt.dismiss();
        }
      );
    });
        },
      },
      { text: 'Cancel', icon: 'close', role: 'cancel' },
    ];
  }

  private generateUpdateDisabledAccountButtons(body: SpModel) {
    return [
      {
        text: 'Enable Account',
        icon: 'share',
        handler: () => {
          console.log('show model to enable user');
        },
      },
      { text: 'Cancel', icon: 'close', role: 'cancel' },
    ];
  }
}
