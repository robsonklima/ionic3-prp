import { Component, OnInit } from '@angular/core';
import {
  NavController, NavParams, AlertController,
  ToastController, LoadingController
} from 'ionic-angular';

import { Project } from "../../models/project";
import { Activity } from '../../models/activity';
import { Risk } from '../../models/risk';
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
  tRiskIdentification: boolean = false;
  project: Project;
  activity: Activity;
  risk: Risk;

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
    if (this.risk.riskIdentificationId)
      this.tRiskIdentification = true;
  }

  public onRiskIdentification() {
    const loading = this.loadingCtrl.create({ content: 'Please wait...' });

    if (!this.risk.riskIdentificationId && this.tRiskIdentification) {
      loading.present();

      this.riskIdentificationService.addRiskIdentification({
        userId: this.authService.getUser().userId,
        projectId: (this.project ? this.project.projectId : null),
        activityId: (this.activity ? this.activity.activityId : null),
        riskId: this.risk.riskId
      })
        .subscribe(
        res => {
          this.handleMessage(res.success);
          this.risk.riskIdentificationId = res.result.insertId
        },
        err => {
          this.handleMessage(err.error);
        }
        );
    } else if (!this.tRiskIdentification && !this.tRiskIdentification) {
      loading.present();

      this.riskIdentificationService.removeRiskIdentification(
        this.risk.riskIdentificationId
      )
        .subscribe(
          res => {
            this.handleMessage(res.success);
            this.risk.riskIdentificationId = null;
          },
          err => {
            this.handleMessage(err.error);
            this.tRiskIdentification = true;
          }
        );
    }

    loading.dismiss();
  }

  public onNewRisk() {
    this.navCtrl.push(RiskFormPage, { mode: 'New' });
  }

  private onLoadRisk() {
    this.risk = this.navParams.get('risk');
    this.project = this.navParams.get('project');
    this.activity = this.navParams.get('activity');
  }

  public onEditRisk(risk: Risk) {
    this.navCtrl.push(RiskFormPage, { mode: 'Edit', risk: risk });
  }

  public onRemoveRisk(risk: Risk) {
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
