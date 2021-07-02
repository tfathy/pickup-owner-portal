import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { CurrencyModel } from '../currency-model';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {
  @Input() model: CurrencyModel;
  @Input() recordStatus: string;
  token: authToken;

  constructor( private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private service: CurrencyService) { }

  async ngOnInit() {this.token = await readStorage('authData');}
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
