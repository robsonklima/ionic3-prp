import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, 
  ToastController, LoadingController } from 'ionic-angular';

import { Risk } from '../../models/risk';
import { RiskFormPage } from '../risk-form/risk-form';
import { RiskService } from '../../services/risk';

@Component({
  selector: 'page-risk',
  templateUrl: 'risk.html'
})
export class RiskPage implements OnInit {
  risk: Risk;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private riskService: RiskService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.onLoadRisk();
  }

  onNewRisk() {
    this.navCtrl.push(RiskFormPage, { mode: 'New' });
  }

  private onLoadRisk() {
    this.risk = this.navParams.get('risk');
  }

  onEditRisk(risk: Risk) {
    this.navCtrl.push(RiskFormPage, { mode: 'Edit', risk: risk });
  }

  onRemoveRisk(risk: Risk) {
    let confirm = this.alertCtrl.create({
      title: 'Please confirm',
      message: 'Are you sure to delete this risk?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => { }
        },
        {
          text: 'Agree',
          handler: () => {
            const loading = this.loadingCtrl.create({ content: 'Please wait...' });
            loading.present();

            this.riskService.removeRisk(risk)
              .subscribe(
                res => {
                  this.handleMessage(res.success);
                  this.navCtrl.popToRoot();
                },
                err => { 
                  this.handleMessage(err.error)
                },
                () => {
                  loading.dismiss();
                }
              );
          }
        }
      ]
    });
    confirm.present();
  }

  private handleMessage(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });
    
    toast.present();
  }
}
