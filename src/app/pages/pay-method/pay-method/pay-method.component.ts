/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { PayMethodModel } from '../pay-method-model';
import { PayMethodService } from '../pay-method.service';

@Component({
  selector: 'app-pay-method',
  templateUrl: './pay-method.component.html',
  styleUrls: ['./pay-method.component.scss'],
})
export class PayMethodComponent implements OnInit {
  token: authToken;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input() model: PayMethodModel;
  @Input() recordStatus: string;
  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private service: PayMethodService
  ) {}

  async ngOnInit() {
    this.token = await readStorage('authData');
  }

  save() {
    this.loadingCtrl
      .create({
        message: 'Saving .. please wait',
      })
      .then((loadingElement) => {
        loadingElement.present();
        if (this.recordStatus === 'insert') {
          this.service
            .create('Bearer ' + this.token.token, this.model)
            .subscribe(
              (data) => {
                loadingElement.dismiss();
                this.modalCtrl.dismiss({
                  saved: true,
                });
              },
              (error) => {
                loadingElement.dismiss();
                console.log(error);
              }
            );
        } else if (this.recordStatus === 'update') {
          this.service
            .update('Bearer ' + this.token.token, this.model, this.model.id)
            .subscribe(
              (data) => {
                loadingElement.dismiss();
                this.modalCtrl.dismiss({
                  saved: true,
                });
              },
              (error) => {
                loadingElement.dismiss();
                console.log(error);
              }
            );
        }
      });
  }
  close() {
    this.modalCtrl.dismiss({
      saved: false,
    });
  }
  disableRecord(){
    this.model.activeFlag = 'N';
    this.recordStatus = 'update';
    this.save();
  }
  enableRecord(){
    this.model.activeFlag = 'Y';
    this.recordStatus = 'update';
    this.save();
  }

}
