import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';

@Injectable()
export class UtilsService {
  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  public handleToast(message: string): Promise<any> {    
    return new Promise((resolve, reject) => {
      const toast = this.toastCtrl.create({
        message: message, duration: 2000, position: 'bottom'
      });

      resolve(toast.present());
    });
  }

  public handleAlert(title: string, message: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const alert = this.alertCtrl.create({
        title: title, message: message, buttons: ['Ok']
      });  
      
      resolve(alert.present());
    });
  }
}