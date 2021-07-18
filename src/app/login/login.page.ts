/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../shared/auth.service';
import { LoginPageService } from './login-page.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  lang = 'en';
  toggled = true;
  form: FormGroup;
  constructor(
    private alert: AlertController,
    private authService: AuthService,
    private loginPageService: LoginPageService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.loadingCtrl
      .create({
        message: 'Log in .... please wait',
      })
      .then((loadingElmnt) => {
        loadingElmnt.present();
        this.authService
          .authLogin(this.username.value, this.password.value)
          .subscribe(
            (loginResponse) => {
              loadingElmnt.dismiss();
              this.router.navigate(['/', 'home']);
            },
            (error) => {
              loadingElmnt.dismiss();
              console.log(error);
            }
          );
      });
  }
  forgetPasswwordEvent() {
    if (this.form.get('username').invalid) {
      this.showAlert('Please Enter your user name first', 'Error');
      return;
    }
    // check if this username exists
    this.loadingCtrl
      .create({
        message: 'Checking your email address ... please wait',
      })
      .then((loadingElmnt) => {
        loadingElmnt.present();
        this.loginPageService.checkUserExists(this.username.value).subscribe(
          (resData) => {
            //send new password
            this.showAlert(
              'A New password is sent.Please Check your email inbox',
              'Confirmation'
            );
            loadingElmnt.dismiss();
          },
          (error) => {
            this.showAlert(error.message.statusText, 'Error');
            loadingElmnt.dismiss();
          }
        );
      });
  }

  onLangChange() {
    this.lang = this.toggled ? 'en' : 'ar';
    Storage.set({ key: 'lang', value: this.lang }).then((data) => {});
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  private showAlert(messageText: string, headerText: string) {
    this.alert
      .create({
        header: headerText,
        message: messageText,
        cssClass: 'notification-alert',
        buttons: ['OK'],
      })
      .then((alertElmnt) => {
        alertElmnt.present();
      });
  }
}
