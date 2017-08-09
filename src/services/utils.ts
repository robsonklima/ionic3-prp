import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtilsService {
  constructor(
    private toastCtrl: ToastController
  ) { }

  public handleToast(message: string): Promise<boolean> {
    const toast = this.toastCtrl.create({
      message: message, duration: 2000, position: 'bottom'
    });

    return new Promise(resolve => toast.present());
  }
}