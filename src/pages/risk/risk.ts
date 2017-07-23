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
import { RiskProblemService } from '../../services/risk-problem';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-risk',
  templateUrl: 'risk.html'
})
export class RiskPage implements OnInit {
  tab: string = "info";
  tRiskIdentification: boolean = false;
  tRiskProblem: boolean = false;
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
    private riskProblemService: RiskProblemService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.onLoadRisk();
    if (this.risk.riskIdentificationId)
      this.tRiskIdentification = true;

    if (this.risk.riskProblemId)
      this.tRiskProblem = true;
  }

  private onLoadRisk() {
    this.risk = this.navParams.get('risk');
    this.project = this.navParams.get('project');
    this.activity = this.navParams.get('activity');
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
          loading.dismiss().then(() => {
            this.handleMessage(res.success);
            this.risk.riskIdentificationId = res.result.insertId;
          });
        },
        err => {
          loading.dismiss().then(() => {
            this.handleMessage(err.error);
          })
        }
        );
    } else if (!this.tRiskIdentification && !this.tRiskIdentification) {
      loading.present();

      this.riskIdentificationService.removeRiskIdentification(
        this.risk.riskIdentificationId
      )
        .subscribe(
        res => {
          loading.dismiss().then(() => {
            this.handleMessage(res.success);
            this.risk.riskIdentificationId = null;
            this.risk.riskIdentificationResponse = null;
          });
        },
        err => {
          loading.dismiss().then(() => {
            this.handleMessage(err.error);
            this.tRiskIdentification = true;
          });
        }
        );
    }
  }

  public onRiskProblem() {
    const loading = this.loadingCtrl.create({ content: 'Please wait...' });

    if (!this.risk.riskProblemId && this.tRiskProblem) {
      loading.present();

      this.riskProblemService.addRiskProblem({
        riskIdentificationId: this.risk.riskIdentificationId,
        userId: this.authService.getUser().userId
      })
        .subscribe(
        res => {
          loading.dismiss().then(() => {
            this.handleMessage(res.success);
            this.risk.riskProblemId = res.result.insertId
          });
        },
        err => {
          loading.dismiss().then(() => {
            this.handleMessage(err.error);
          });
        }
        );
    } else if (!this.tRiskProblem && !this.tRiskProblem) {
      loading.present();

      this.riskProblemService.removeRiskProblem(
        this.risk.riskProblemId
      )
        .subscribe(
        res => {
          loading.dismiss().then(() => {
            this.handleMessage(res.success);
            this.risk.riskProblemId = null;
          });
        },
        err => {
          loading.dismiss().then(() => {
            this.handleMessage(err.error);
            this.tRiskProblem = true;
          });
        }
        );
    }
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
                loading.dismiss();
                this.handleMessage(res.success);
                this.navCtrl.popToRoot();
              },
              err => {
                loading.dismiss();
                this.handleMessage(err.error)
              }
              );
          }
        }
      ]
    });
    confirm.present();
  }

  public onNewRisk() {
    this.navCtrl.push(RiskFormPage, { mode: 'New' });
  }

  public onEditRisk(risk: Risk) {
    this.navCtrl.push(RiskFormPage, { mode: 'Edit', risk: risk });
  }

  public blurResponsePlanning(input) {
    if (input.value) {
      this.riskIdentificationService.updateRiskIdentification({
        riskIdentificationId: this.risk.riskIdentificationId,
        riskIdentificationResponse: input.value
      })
        .subscribe(
        res => {
          this.handleMessage(res.success);
          this.risk.riskIdentificationResponse = input.value;
        },
        err => {
          this.handleMessage(err.error);
        }
        );
    }
  }

  public blurProblemDeal(input) {
    if (input.value) {
      this.riskProblemService.updateRiskProblem({
        riskProblemId: this.risk.riskProblemId,
        riskProblemDeal: input.value
      })
        .subscribe(
        res => {
          this.handleMessage(res.success);
          this.risk.riskProblemDeal = input.value;
        },
        err => {
          this.handleMessage(err.error);
        }
        );
    }
  }

  private handleMessage(message: string) {
    const toast = this.toastCtrl.create({
      message: message, duration: 1500, position: 'bottom'
    });

    toast.present();
  }
}
