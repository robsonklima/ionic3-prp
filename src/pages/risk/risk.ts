import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, 
  ToastController, LoadingController } from 'ionic-angular';

import { Project } from "../../models/project";
import { Activity } from '../../models/activity';
import { Risk } from '../../models/risk';
import { RiskIdentification } from '../../models/risk-identification';
import { RiskFormPage } from '../risk-form/risk-form';
import { RiskService } from '../../services/risk';
import { RiskIdentificationService } from '../../services/risk-identification';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-risk',
  templateUrl: 'risk.html'
})
export class RiskPage implements OnInit {
  tab: string = "info";
  project: Project;
  activity: Activity;
  risk: Risk;
  riskIdentification: RiskIdentification;
  tRiskIdentification: boolean;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private riskService: RiskService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private riskIdentificationService: RiskIdentificationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.onLoadRisk();
  }

  onRiskIdentification() {
    if (this.tRiskIdentification) {
      this.riskIdentification.riskIdentificationUserId = this.authService.getUser().userId;
      this.riskIdentification.riskIdentificationProjectId = this.project.projectId;
      this.riskIdentification.riskIdentificationRiskId = this.risk.riskId;

      this.riskIdentificationService.addRiskIdentification(this.riskIdentification);
    } else {
      this.riskIdentificationService.removeRiskIdentification(this.riskIdentification.riskIdentificationId);
    }
  }

  onNewRisk() {
    this.navCtrl.push(RiskFormPage, { mode: 'New' });
  }

  private onLoadRisk() {
    this.risk = this.navParams.get('risk');
    this.project = this.navParams.get('project');
    this.activity = this.navParams.get('activity');
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
