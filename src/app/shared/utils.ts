import { ToastController } from '@ionic/angular';

export class Utils{
  constructor(public   toast: ToastController){}

  public  showToast(msg: string) {
    this.toast
      .create({
        message: msg,
        position: 'middle',
        duration: 1000,
      })
      .then((toastCtrl) => {
        toastCtrl.present();
      });
  }
}
