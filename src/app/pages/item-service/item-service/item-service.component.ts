import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { ServiceModel } from '../../services/service-model';
import { ItemServService } from '../item-serv.service';
import { ItemServiceModel } from '../item-service-model';

@Component({
  selector: 'app-item-service',
  templateUrl: './item-service.component.html',
  styleUrls: ['./item-service.component.scss'],
})
export class ItemServiceComponent implements OnInit {
@Input()model: ItemServiceModel;
@Input() title: string;
@Input()recordStatus: string;
@Input() serviceDefList: ServiceModel[] =[];
token: authToken;


  constructor(private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private service: ItemServService) { }

  async ngOnInit() {  this.token = await readStorage('authData');}
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
  close() {
    this.modalCtrl.dismiss({
      saved: false,
    });
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
                  itemId:data.itemId
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
                console.log(data);
                loadingElement.dismiss();
                this.modalCtrl.dismiss({
                  saved: true,
                  itemId:data.itemId
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
}
