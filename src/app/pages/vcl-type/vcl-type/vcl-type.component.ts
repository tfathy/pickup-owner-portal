/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { VclTypeModel } from '../vcl-type-model';
import { VclTypeService } from '../vcl-type.service';

@Component({
  selector: 'app-vcl-type',
  templateUrl: './vcl-type.component.html',
  styleUrls: ['./vcl-type.component.scss'],
})
export class VclTypeComponent implements OnInit {
  token: authToken;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input() model: VclTypeModel;
  @Input() recordStatus: string;
  constructor( private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private service: VclTypeService) { }

  async ngOnInit() { this.token = await readStorage('authData');}
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
