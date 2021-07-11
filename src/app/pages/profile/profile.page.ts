import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { authToken, readStorage } from 'src/app/shared/shared-util';
import { CountryModel } from '../country/country-model';
import { CountryService } from '../country/country.service';
import { SysOwnerUserModel } from '../users/sys-owner-users-model';
import { ProfileService } from './profile.service';
import { SysOwnerModel } from './sys-owner-model';
import { SysOwnerService } from './sys-owner.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  changePasswordForm;
  model: SysOwnerModel = new SysOwnerModel();
  token: authToken;
  empName: string;
  countryList: CountryModel[] = [];
  id = 1;
  constructor(
    private service: SysOwnerService,
    private countryService: CountryService,
    private profileService: ProfileService,
    private loadingCtrl: LoadingController,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      oldpwassword: new FormControl('', [Validators.required]),
      newpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      repeatpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    this.loadingCtrl
      .create({
        message: 'featching data',
      })
      .then(async (loadingElmnt) => {
        loadingElmnt.present();
        this.token = await readStorage('authData');
        this.empName = this.token.fullnameEn;
        this.countryService
          .findAll('Bearer ' + this.token.token)
          .subscribe((data) => {
            this.countryList = data;
            console.log(this.countryList);
          });
        this.service.findById('Bearer ' + this.token.token, this.id).subscribe(
          (data) => {
            this.model = data;
            loadingElmnt.dismiss();
          },
          (error) => {
            loadingElmnt.dismiss();
            console.log(error);
          }
        );
      });
  }

  updateProfile() {
    this.loadingCtrl
      .create({
        message: 'Saving .. please wait',
      })
      .then((loadingElmnt) => {
        loadingElmnt.present();
        this.service
          .update('Bearer ' + this.token.token, this.model, this.model.id)
          .subscribe(
            (resData) => {
              loadingElmnt.dismiss();
              this.showToast('Profile updated');
            },
            (error) => {
              loadingElmnt.dismiss();
              console.log(error);
            }
          );
      });
  }
  changePassword() {
    if (this.newpassword.value !== this.repeatpassword.value) {
      this.showToast('PASSWORD_MISMATCH');
      return;
    }
    const body: SysOwnerUserModel = new SysOwnerUserModel();
    this.loadingCtrl
      .create({
        message: 'please wait ...',
      })
      .then(async (elmnt) => {
        elmnt.present();
        this.token = await readStorage('authData');
        body.email = this.token.email;
        this.profileService
          .changePassword(
            'Bearer ' + this.token.token,
            body,
            body.email,
            this.oldpwassword.value,
            this.newpassword.value
          )
          .subscribe((resData) => {
            elmnt.dismiss();
            console.log(resData);
            this.showToast('Password changed successfully');
          },error=>{
            elmnt.dismiss();
            this.showToast('Error: Password could not be changed');
          });
      });
  }

  get oldpwassword() {
    return this.changePasswordForm.get('oldpwassword');
  }

  get newpassword() {
    return this.changePasswordForm.get('newpassword');
  }

  get repeatpassword(){
    return this.changePasswordForm.get('repeatpassword');
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
