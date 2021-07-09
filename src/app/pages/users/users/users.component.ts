/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { EmployeeModel } from '../../employee/employee-model';
import { CreateUserModel } from '../create-user-model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  token: authToken;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input() model: CreateUserModel;
  @Input() empList: EmployeeModel[];
  @Input() recordStatus: string;
  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private service: UsersService
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
            .createUser('Bearer ' + this.token.token, this.model)
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
            .updateUser('Bearer ' + this.token.token, this.model, this.model.email)
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
    this.model.accountStatus = 'DISABLED';
    this.recordStatus = 'update';
    this.save();
  }
  enableRecord(){
    this.model.accountStatus = 'ENABLED';
    this.recordStatus = 'update';
    this.save();
  }
}
