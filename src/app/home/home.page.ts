import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    const promise1 = Promise.resolve(Storage.remove({ key: 'authData' }));
    this.loadingCtrl
      .create({
        message: 'log out ..',
      })
      .then((loadingElmnt) => {
        loadingElmnt.present();
        Promise.all([promise1]).then((data) => {
          this.authService.logout();
          this.router.navigateByUrl('/login');
          loadingElmnt.dismiss();
        });
      });
  }
}
