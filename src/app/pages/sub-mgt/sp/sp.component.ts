import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { SpModel } from 'src/app/shared/model/sp-model';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { SubMgtService } from '../sub-mgt.service';

@Component({
  selector: 'app-sp',
  templateUrl: './sp.component.html',
  styleUrls: ['./sp.component.scss'],
})
export class SpComponent implements OnInit {
  @Input() model: SpModel;
  @Input() recordStatus: string;
  token: authToken;
  constructor( private modalCtrl: ModalController,private loadingCtrl: LoadingController, private spService: SubMgtService) { }

  async ngOnInit() {this.token = await readStorage('authData');}
  save() {
    this.loadingCtrl
      .create({
        message: 'Saving .. please wait',
      })
      .then((loadingElement) => {
        loadingElement.present();
        if (this.recordStatus === 'insert') {
          this.spService
            .createSp('Bearer ' + this.token.token, this.model)
            .subscribe(
              (data) => {
                loadingElement.dismiss();
                console.log(data);
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
          this.spService
            .updateSp('Bearer ' + this.token.token, this.model, this.model.id)
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

}
