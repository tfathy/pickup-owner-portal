import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  lang = 'en';
  toggled = true;
  form;
  constructor(
    private toast: ToastController,
    private authService: AuthService,
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
          .subscribe((loginResponse) => {
            loadingElmnt.dismiss();
            console.log(loginResponse);
            this.router.navigate(['/','home']);
          },error=>{
            loadingElmnt.dismiss();
            console.log(error);
          });
      });
  }

  onLangChange() {
    this.lang = this.toggled ? 'en' : 'ar';
    Storage.set({ key: 'lang', value: this.lang }).then((data) => {
      console.log(data);
      console.log(this.username.value);
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }


}
