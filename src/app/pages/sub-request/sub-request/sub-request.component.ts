import { Component, Input, OnInit } from '@angular/core';

import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { SubscriptionRequestModel } from '../sub-request-model';
import { SubRequestService } from '../sub-request.service';

@Component({
  selector: 'app-sub-request',
  templateUrl: './sub-request.component.html',
  styleUrls: ['./sub-request.component.scss'],
})
export class SubRequestComponent implements OnInit {
  @Input() model: SubscriptionRequestModel;
  token: authToken;
  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private service: SubRequestService
  ) {}

  async ngOnInit() {
    this.token = await readStorage('authData');
  }

  acceptRequest() {
    this.alertCtrl
      .create({
        header: 'Confirmation',
        message: 'Do you want to accept the request?',
        cssClass: 'confirmation-alert',
        buttons: [
          {
            text: 'Yes',
            handler: (onYes) => {
              this.model.status = 'S';
              this.service
                .updateStatus(
                  'Bearer ' + this.token.token,
                  this.model,
                  this.model.id
                )
                .subscribe((data) => {
                  this.modalCtrl.dismiss({ accepted: true });
                },error=>{
                  console.log(error);
                });
            },
          },
          { text: 'No', role: 'cancel' },
        ],
      })
      .then((alertElement) => {
        alertElement.present();
      });
  }

  rejectRequest() {
    this.alertCtrl
      .create({
        header: 'Warning',
        message: 'Do you want to reject the request?',
        cssClass: 'warning-alert',
        buttons: [
          {
            text: 'Yes',
            handler: (onYes) => {
              this.loadingCtrl
                .create({
                  message: ' please wait...',
                })
                .then((loadingElmnt) => {
                  loadingElmnt.present();
                  this.model.status = 'R';
                  this.service
                    .updateStatus(
                      'Bearer ' + this.token.token,
                      this.model,
                      this.model.id
                    )
                    .subscribe(
                      (data) => {
                        loadingElmnt.dismiss();
                        this.modalCtrl.dismiss({ accepted: false });
                      },
                      (error) => {
                        loadingElmnt.dismiss();
                        console.log(error);
                      }
                    );
                });
            },
          },
          {
            text: 'No',
            role: 'cancel',
          },
        ],
      })
      .then((alertElement) => {
        alertElement.present();
      });
  }
  delete() {
    this.loadingCtrl
      .create({
        message: 'please wait ...',
      })
      .then((loadingElemnt) => {
        loadingElemnt.present();
        this.service
          .deleteRequest('Bearer ' + this.token.token, this.model.id)
          .subscribe(
            (data) => {
              loadingElemnt.dismiss();
              this.modalCtrl.dismiss({ accepted: false });
            },
            (error) => {
              loadingElemnt.dismiss();
              console.log(error);
            }
          );
      });
  }
  close() {
    this.modalCtrl.dismiss({
      saved: false,
    });
  }
}
