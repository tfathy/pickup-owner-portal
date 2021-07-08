import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { EmployeeModel } from '../employee-model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
@Input() model: EmployeeModel;
@Input() recordStatus: string;
token: authToken;
  constructor(private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private service: EmployeeService) { }

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
                  console.log(data);
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

}
